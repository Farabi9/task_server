const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const cors = require('cors');
require('dotenv').config();
const port = process.env.port || 5000;

const app = express()


app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.lbdedqe.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
 try{
      await client.connect();
     const serviceCollection = client.db('ed-tech').collection('services')
     const homeService = client.db('ed-tech').collection('home_service')


     app.get('/service', async(req, res) =>{
         const query ={};
         const result = await serviceCollection.find(query).toArray()
         res.send(result);
     })

     app.get('/services', async(req, res) =>{
       const query = {};
       const result = await homeService.find(query).toArray();
       res.send(result)
     })
 }
 finally{

 }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello ED-Tech!')
})

app.listen(port, () => {
  console.log(` Listening on port ${port}`)
})
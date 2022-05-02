const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config()
const cors = require('cors')
app.use(cors())
app.use(express.json())





app.get('/', (req, res) => {
  res.send('Hello World!')
})





const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASS}@cluster0.34sb0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });






async function run() {
    try {
      await client.connect();
      const bookCollection = client.db('Book').collection('item')

      app.get('/inventory', async (req, res) =>{
          const query ={}
          const cursor = bookCollection.find(query)
            const inventory = await cursor.toArray()
            res.send(inventory)


        app.get('/inventory/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const inventory = await bookCollection.findOne(query);
            res.send(inventory)
            
        })
      })
     
    } 
    
    finally {
      
    }
  }
  run().catch(console.dir);
















app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

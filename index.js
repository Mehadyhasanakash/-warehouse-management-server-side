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
      
      // all inventory item

      app.get('/inventory', async (req, res) =>{
          const query ={}
          const cursor = bookCollection.find(query)
            const inventory = await cursor.toArray()
            res.send(inventory)
          })

        // inventoryid item

        app.get('/inventory/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const inventory = await bookCollection.findOne(query);
            res.send(inventory)
          })


// post item
            app.post('/inventory', async (req, res) => {


              const inventory = req.body;
              console.log('add a new user', inventory)
              
              const result = await bookCollection.insertOne(inventory)
              
              res.send(result)



            })

            // delete item
            app.delete('/inventory/:id', async(req, res) =>{
              const id = req.params.id;
              const query = {_id: ObjectId(id)};
              const result = await bookCollection.deleteOne(query);
              res.send(result);
            })

            // put item
            
            app.put('/inventory/:id', async(req, res) => {
              const id = req.params.id;
              console.log(id)
              const updateInventory = req.body;
               const filter = {_id: ObjectId(id)};
              const options = { upsert: true };

              const updateDoc = {
                $set: {
                  quantity: updateInventory.result
                }
              };
              const result = await bookCollection.updateOne(filter, updateDoc, options)
              res.send(result)

              
            })
            
        
      
     
    } 
    
    finally {
      
    }
  }
  run().catch(console.dir);
















app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000;

const cors = require('cors')
const { MongoClient } = require('mongodb');


const ObjectId = require('mongodb').ObjectId



//middle ware//
app.use(cors());
app.use(express.json());
//middle ware//




//NEW CONNECT to data base and node server code end//
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ruek4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//NEW CONNECT to data base and node server code end//

async function run() {
  try {
    await client.connect();
    const database = client.db("E-commerce");

    //*******************************all get api************************** */
  }

  finally {
    // await client.close();
  }

}

run().catch(console.dir);
app.get('/', (req, res) => {
  res.send('Hello World!')
});
app.listen(port, () => {
  console.log("Example", port)
});
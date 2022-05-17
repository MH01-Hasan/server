const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;



const ObjectId = require('mongodb').ObjectId



//middle ware//
app.use(cors());
app.use(express.json());




//NEW CONNECT to data base and node server code end//
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ruek4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//NEW CONNECT to data base and node server code end//

async function run() {
  try {
    await client.connect();
    const database = client.db("uaedb");
    const usersCollection = database.collection("users");
    const ProductColloction = database.collection("Product");
    const OrdersColloction = database.collection("Orders");
    // console.log("Database Connected");
    // ..................All Get Api...........................///
    // GET Find single data deatails Document Client site read code//
    //GEt  Find Multiple Documents Client site read code//
    app.get('/Product', async (req, res) => {
      const cursor = ProductColloction.find({});
      const Product = await cursor.toArray();
      res.send(Product)
    })
    //GEt  Find Multiple Documents Client site read code//


    app.get('/Product/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const Product = await ProductColloction.findOne(query);
      res.send(Product)
    })


    //find  a single  order data//
    app.get("/myOrder/:email", async (req, res) => {
      const result = await OrdersColloction.find({
        email: req.params.email,
      }).toArray();
      res.send(result);
    });



    // ..................All Post Api.............................///
    // users post api
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.json(result);
    });


    // app.post('/Product',async(req, res)=>{
    app.post('/Product', async (req, res) => {
      const Product = req.body;
      const result = await ProductColloction.insertOne(Product);
      res.send(result);
    })

    // app.post('/Order',async(req, res)=>{
    app.post('/Orders', async (req, res) => {
      const order = req.body;
      const result = await OrdersColloction.insertOne(order);
      res.send(result);
    })
    //  /....................All Delet Api..///////////////////////////
    //Manage  product  api  code//
    app.delete('/Product/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await ProductColloction.deleteOne(query)
      res.json(result)
    })
    //Delete all order api  code//


    //Delete all order api  code//
    app.delete('/Orders/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await OrdersColloction.deleteOne(query)
      res.json(result)
    })
    //Delete all order api  code//

    //my order deletapi code //
    app.delete('/myOrder/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await OrdersColloction.deleteOne(query)
      res.json(result)
    })
    //my order deletapi code //



    // // users GET API
    // app.get("/users", async (req, res) => {
    //   const cursor = usersCollection.find({});
    //   const users = await cursor.toArray();
    //   res.json(users);
    // });

    // // put users
    // app.put("/users", async (req, res) => {
    //   const user = req.body;
    //   const filter = { email: user.email };
    //   const options = { upsert: true };
    //   const updateDoc = { $set: user };
    //   const result = await usersCollection.updateOne(
    //     filter,
    //     updateDoc,
    //     options
    //   );
    //   res.json(result);
    // });

    // // put admin
    // app.put("/users/admin", async (req, res) => {
    //   const user = req.body;
    //   console.log("put", user);
    //   const filter = { email: user.email };
    //   const updateDoc = { $set: { role: "admin" } };
    //   const result = await usersCollection.updateOne(filter, updateDoc);
    //   res.json(result);
    // });

    // // get admin user
    // app.get("/users/:email", async (req, res) => {
    //   const email = req.params.email;
    //   const query = { email: email };
    //   const user = await usersCollection.findOne(query);
    //   let isAdmin = false;
    //   if (user?.role === "admin") {
    //     isAdmin = true;
    //   }
    //   res.json({ admin: isAdmin });
    // });
  } finally {
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
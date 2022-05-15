const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ruek4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("uaedb");
    const usersCollection = database.collection("users");
    // console.log("Database Connected");

    // users post api
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.json(result);
    });

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

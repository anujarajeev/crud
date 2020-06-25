const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const connectionString =
  "mongodb+srv://admin:password323@cluster0-vbkw4.mongodb.net/assignment?retryWrites=true&w=majority";

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    const db = client.db("assignment");
    console.log("Connected to Database", db);
    const productsCollection = db.collection("products");
    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({ extended: true }));
    //1
    app.get("/", (req, res) => {
      db.collection("products")
        .find()
        .toArray()
        .then((results) => {
          res.render("index.ejs", { products: results });

          console.log(results);
        })
        .catch((error) => console.error(error));
    });
    //2
    app.post("/products", (req, res) => {
      productsCollection
        .insertOne(req.body)
        .then((result) => {
          console.log(result);
          res.redirect("/");
        })
        .catch((error) => console.error(error));

      console.log("Hellooooooooooooooooo!", req.body);
    });

    app.listen(3000, function () {
      console.log("listening on 3000");
    });
  })
  .catch((error) => console.error(error));

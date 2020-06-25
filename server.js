console.log('May Node be with  ssh you')
const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
const connectionString="mongodb+srv://admin:password323@cluster0-vbkw4.mongodb.net/assignment?retryWrites=true&w=majority"

app.use(bodyParser.urlencoded({ extended: true }))


  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
    // Note: __dirname is directory current directory you're in. Try logging it and see what you get!
    // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
  })

  app.post('/quotes', (req, res) => {
    console.log('Hellooooooooooooooooo!',req.body)
  })

  MongoClient.connect(connectionString,   {useUnifiedTopology: true},).then(client => {
    const db = client.db("assignment")
    console.log('Connected to Database',db)
  })  .catch(error => console.error(error))

  app.listen(3000, function() {
    console.log('listening on 3000')
  })

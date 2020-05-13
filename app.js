var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://webmaster:qwe123QWE@cluster0-kgkuk.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("restaurants").collection("devices");
  // Comprobar que la conexión es correcta
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to DB");
  }

  client.close();
});

app.get('/', function (req, res){
  res.sendFile(__dirname  + '/index.html');
});

app.post('/restaurants', (req, res) => {
  console.log(req.body);
});

app.listen(3000, function() {
  console.log('La app funciona en el puerto 3000');
});

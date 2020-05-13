var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }))

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://webmaster:qwe123QWE@cluster0-kgkuk.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


//  Insertar restaurantes
client.connect(err => {
  const db = client.db("app");
  const restaurantsCollection = db.collection("restaurants");
  // Comprobar que la conexión es correcta
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to DB");
  }

  app.post('/restaurants', (req, res) => {
    restaurantsCollection.insertOne(req.body)
    .then(result => {
      res.redirect('/')
    })
    .catch(error => console.error(error));
  });

});

app.get('/', function (req, res){
  res.sendFile(__dirname  + '/index.html');
});



app.listen(3000, function() {
  console.log('La app funciona en el puerto 3000');
});

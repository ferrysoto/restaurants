var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://webmaster:qwe123QWE@restaurants-app-txqq2.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const db = client.db("app");
  const restaurantsCollection = db.collection("restaurants");
  // Comprobar que la conexión es correcta
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to DB");
  }

  // Mostrar restaurantes
  app.get('/', function (req, res) {
    res.render('index.ejs')
  });

  //  Insertar restaurantes desde formulario
  app.get('/new-restaurant', function (req, res) {
    res.render('new-restaurant.ejs')
  });

  app.post('/create-restaurant', (req, res) => {
    restaurantsCollection.insertOne(req.body)
    .then(result => {
      res.redirect('/')
    })
    .catch(error => console.error(error));
  });


  app.get('/restaurants', function (req, res) {
    db.collection('restaurants').find().toArray()
      .then(results => {
        res.render('restaurants.ejs', { restaurants: results })
      })
  });

});

app.listen(3000, function() {
  console.log('La app funciona en el puerto 3000');
});

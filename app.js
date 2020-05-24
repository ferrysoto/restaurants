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
  const menuCollection = db.collection("menu");
  const langCollection = db.collection("language");
  const catCollection = db.collection("categories");


  // Comprobar que la conexión es correcta
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to DB");
  }

  // Mostrar restaurantes
  // app.get('/', function (req, res) {
  //   res.render('index.ejs')
  // });

  // Vista de restaurantes
  app.get('/restaurants', function (req, res) {
    db.collection('restaurants').find().toArray()
      .then(results => {
        res.render('restaurants.ejs', { restaurants: results })
      })
  });

  //  Insertar restaurantes desde formulario
  app.post('/create-restaurant', (req, res) => {
    restaurantsCollection.insertOne(req.body)
    .then(result => {
      res.redirect('/restaurants')
    })
    .catch(error => console.error(error));
  });


    // Mostrar menú
    app.get('/', function (req, res) {
      db.collection('menu').find().toArray()
        .then(results => {
          res.render('index.ejs', { menu: results })
        })
    });

    //  Insertar menú desde formulario
    app.post('/create-menu', (req, res) => {
      menuCollection.insertOne(req.body)
      .then(result => {
        res.redirect('/')
      })
      .catch(error => console.error(error));
    });

});

app.listen(80, function() {
  console.log('La app funciona en el puerto 80');
});

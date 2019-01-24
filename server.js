
  const MongoClient = require('mongodb').MongoClient

// call the packages we need
  var express    = require('express')      // call express
  var bodyParser = require('body-parser')
  var app        = express()     // define our app using express

// configure app to use bodyParser() and ejs
  app.use(bodyParser.urlencoded({ extended: true }));
  app.set('view engine','ejs');

// get an instance of the express Router
  var router = express.Router();
  app.use('/api', router);

// a “get” at the root of our web app: http://localhost:3000/api

  router.get('/', function(req, res) {
    MongoClient.connect("mongodb://Cameron:Kitabit01@ds227243.mlab.com:27243/cameron_db",{useNewUrlParser:true}, function(err, client) {
      if(err) { console.log(err) }
      var db = client.db("cameron_db");
      db.collection("collection").find({}).toArray(function(err, result) {
      res.render('index.ejs', {collection: result})
      });
    });
  });
  router.get('/api', function(req, res) {
    MongoClient.connect("mongodb://Cameron:Kitabit01@ds227243.mlab.com:27243/cameron_db",{useNewUrlParser:true}, function(err, client) {
      if(err) { console.log(err) }
      var db = client.db("cameron_db");
      db.collection("collection").find({}).toArray(function(err, result) {
      res.render('index.ejs', {collection: result})
      });
    });
  });
  app.get('/render', (req, res) => {
    res.render("edit.ejs");
  });
  app.post('/edit', (req,res) => {
    db.collection('collection').updateOne( (original), req.body , (err, result) => {
      if(err) return console.log(err)
      console.log('document edited')
      res.redirect('/api')
  });
});

  app.post('/collection', (req, res) => {
    db.collection('collection').insertOne(req.body , (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/api')
    })
  })
  app.post('/delete', (req, res) => {
    db.collection("collection").deleteOne(req.body , (err, result) => {
      if (err) throw err;
      console.log("1 document deleted");
      res.redirect('/api')
    });
  });

var db
MongoClient.connect("mongodb://Cameron:Kitabit01@ds227243.mlab.com:27243/cameron_db",{useNewUrlParser:true}, function(err, client) {
    if(err) { console.log(err) }
    console.log("Connected successfully to server");
    db = client.db("cameron_db")
    app.listen(3000, () => {
        console.log('finally.')
    })

});

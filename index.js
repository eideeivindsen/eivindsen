var express    = require('express');
var app        = express();
var path       = require("path");
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

// Activate bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set the port of our application
// Process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// must specify options hash even if no options provided!
var phpExpress = require('php-express')({

  // assumes php is in your PATH
  binPath: 'php'
});

// set view engine to php-express
app.set('views', './php');
app.engine('php', phpExpress.engine);
app.set('view engine', 'php');

// routing all .php file to php-express
app.all(/.+\.php$/, phpExpress.router);

// Make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// Set the home page route
app.get('/', function(req,res){
  res.sendFile(path.join(__dirname + '/index.html'));
});

// Set nikolai route
app.get('/nikolai', function(req,res){
  res.sendFile(path.join(__dirname + '/nikolai.html'));
});

app.post('/mailer.php' ,function ( req, res ){
    res.render("/mailer.php");
});

// Running the application
app.listen(port, function() {
    console.log('App is running on http://localhost:' + port);
});

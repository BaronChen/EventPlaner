var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('./db/db.js');
var path = require('path');

// parse application/json
app.use(bodyParser.json())

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules'))); 
app.use('/public', express.static(path.join(__dirname, 'public'))); 
//app.use(express.static(path.join(__dirname, 'public'))); 

//I will personally prefer to register all controller manually here
var planController = require('./controllers/planController.js');
planController.init(app);
    


app.use('/*', express.static(path.join(__dirname, 'public'))); 

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});


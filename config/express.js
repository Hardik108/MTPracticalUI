/*
Created By : Hardik Lakhani
*/
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');

module.exports = function (db) {
  var app = express();
  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
  var server = http.createServer(app);
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization,access-token');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  app.set('views', './app/views');
  app.set('view engine', 'ejs');
  app.get('/', function (req, res) {
    res.render('index');
  });

  require('../app/routes/users')(app);
  require('../app/routes/product')(app);
  require('../app/routes/category')(app);
  require('../app/routes/subcategory')(app);

  return server;
};
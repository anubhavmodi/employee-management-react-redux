'use strict';
let express = require('express');
let bodyParser = require('body-parser');
let logger = require('morgan');
let path = require('path');
let cookieParser = require('cookie-parser');

let webpack = require('webpack');
let webpackDevMiddleware = require('webpack-dev-middleware');
let webpackHotMiddleware = require('webpack-hot-middleware');
let config = require('../webpack.config');

let router = express.Router();

//initiate express
let app = express();

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(cookieParser());


//API Routes

let dataRoutes = require('./routes/routes');
app.use('/api', dataRoutes);
app.use('/project/api', dataRoutes);


// webpack loads index.html, looks for script src
app.get('/build/bundle.js', function(req, res){
  res.sendFile(path.join(__dirname, '../build/bundle.js'));
});

app.get('*', function(req, res){
  console.log('REQ.URL IS: ', req.url);
  res.sendFile(path.join(__dirname, '../index.html'));
});


//set and run the port and server
app.set('port',process.env.PORT || 8080);
let port = app.get('port');
app.listen(port);
console.log("Server listening on PORT", port);

module.exports = app;
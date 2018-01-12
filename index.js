'use strict';

const pdf = require('html-pdf');

var app = require('express')();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
// app.use(bodyParser.json({ type: 'application/json ' }));
app.use(bodyParser.text({ type: 'text/html' }));
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => res.send('Hi there'));

app.post('/', function (req, res) {
  let html = req.body;
  if (req.headers['content-type'] === 'application/json') html = req.body.content;

  if (!html) return res.send('No HTML specified');

  pdf.create(html, req.body).toBuffer(function(err, buffer){
    // res.writeHead(200, { 'Content-Type': 'text/html '});

    res.header('Content-Type', 'application/pdf');
    res.write(buffer, 'binary');
    res.end(null, 'binary');
  });
});

module.exports = app;

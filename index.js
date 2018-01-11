const pdf = require('html-pdf');

var app = require('express')();
var bodyParser = require('body-parser');

app.use(bodyParser.text({ type: 'text/html' }))
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/', function (req, res) {
  console.log('BODY', req.body);

  pdf.create(req.body).toBuffer(function(err, buffer){
    // res.writeHead(200, { 'Content-Type': 'text/html '});

    res.header('Content-Type', 'application/pdf');
    res.write(buffer, 'binary');
    res.end(null, 'binary');
  });
});

module.exports = app;

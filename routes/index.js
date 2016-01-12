var express = require('express');
var path = require('path');

var app = express();

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

server = app.listen(process.env.PORT || 4001, function() {
  var port = server.address().port;

  console.log('Server is listening at %s', port);
});

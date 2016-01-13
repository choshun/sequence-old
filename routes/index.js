var express = require('express');
var path = require('path');

var app = express();
console.log('dir', __dirname);

var PATH_STYLES = path.resolve(__dirname, '../public/css');
var PATH_JS = path.resolve(__dirname, '../public/js');
var PATH_SAMPLES = path.resolve(__dirname, '../public/samples');

app.use('/css', express.static(PATH_STYLES));
app.use('/js', express.static(PATH_JS));
app.use('/samples', express.static(PATH_SAMPLES));

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

server = app.listen(process.env.PORT || 4001, function() {
  var port = server.address().port;

  console.log('Server is listening at %s', port);
});

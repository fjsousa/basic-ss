var static = require('node-static');
var http = require('http');

module.exports = function (port) {
  
  var file = new(static.Server)();

  http.createServer(function (req, res) {
    file.serve(req, res);
  }).listen(port);  

};

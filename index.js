var http = require('http');
var express = require('express');
var ExpressPeerServer = require('peer').ExpressPeerServer;

var app = express();

var server = http.createServer(app);

var options = {
    debug: true,
    allow_discovery: true
};
var expressPeerServer = ExpressPeerServer(server, options);

app.use('/api', expressPeerServer);
app.use('/', express.static('.'));

app.use('/list', function (req, res) {
  return res.json(Object.keys(expressPeerServer._clients.peerjs)); 
});

var port = process.env.PORT || 5000;
server.listen(port, function () {
  console.log('Basic-ss live at', port);
});

expressPeerServer.on('connection', function (id) {
  console.log('Peer connected with id:', id);
});

expressPeerServer.on('disconnect', function (id) {
  console.log('Peer %s disconnected', id);
});
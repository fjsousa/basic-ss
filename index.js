var static = require('./static');
static(8080);

var PeerServer = require('peer').PeerServer;
var WebSocketServer = require('ws').Server;

var peerServer = PeerServer({port: 9000, path: '/myapp'});
var wss = new WebSocketServer({port: 9001});

var peers = [];
peerServer.on('connection', function (id) {
  console.log('Peer connected with id:', id);
  peers.push(id);

  signalMaster(); 
});

peerServer.on('disconnect', function (id) {
  console.log('Peer %s disconnected', id);
  var i = peers.indexOf(id);
  peers.splice(i, 1);

  signalMaster();
});

var masterSocket = null;
  
wss.on('connection', function(socket) {
  //First socket is master socket
  if (!masterSocket){
    masterSocket = socket;
    signalMaster();

    //handle Master Socket disconnet
    socket.on('close', function() {
      masterSocket = null;
      console.log('Master disconnected.');
    });
  }

});

function signalMaster(){
  if (!masterSocket || peers.length === 0 )
    return;

  console.log('Sending peer list  to Master');
  masterSocket.send(JSON.stringify(peers), function ack(error) {
    if (error)
      console.log('Error sending data to Master client.');
  });
}
var BinaryServer = require('binaryjs').BinaryServer;
var fs = require('fs');
var app = require('express')();
var http = require('http').Server(app);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var server = http.listen((process.env.PORT || 5000), function(){
  console.log('listening on *:3050');
});
// Start Binary.js server
var binaryServer = BinaryServer({server: server});
// Wait for new user connections
binaryServer.on('connection', function(client){
  // Stream a flower as a hello!
  var file = fs.createReadStream(__dirname + '/adele.mp3');
  client.send(file); 
});

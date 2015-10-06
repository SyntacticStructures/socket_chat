// require express and path
var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
// create the express app
var app = express();
app.use(bodyParser.urlencoded());
// static content 
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index");
})
app.get('/signup', function(req, res){
	res.render('signup');
})
app.post('results', function(req, res){
	res.render('results');
})

// tell the express app to listen on port 8000
var server = app.listen(8000, function() {
 console.log("listening on port 8000");
})
var io = require('socket.io').listen(server)  // notice we pass the server object
// Whenever a connection event happens (the connection event is built in) run the following code
io.sockets.on('connection', function (socket) {
  console.log("WE ARE USING SOCKETS!");
  console.log(socket.id);

  // If you don't know where this code is supposed to go reread the above info 
socket.on("posting_form", function (data){
	console.log(data);

	io.emit("server_response", {data:data});
})
socket.on("button_clicked", function(data){
	io.emit("chat_response", data);
})
  //all the socket code goes in here!
})

// below are examples of the different types of emit:
// io.sockets.on('connection', function (socket) {
//     //  EMIT:
//     socket.emit('my_emit_event');
//     //  BROADCAST:
//     socket.broadcast.emit("my_broadcast_event");
//     //  FULL BROADCAST:
//     io.emit("my_full_broadcast_even");
// })


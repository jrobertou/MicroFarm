var players = [];
var gameManager = require('../modules/game.js');

exports.listen = function(io)
{	

	io.sockets.on('connection', function (socket) {

	  socket.on('iamanewboy', function (data) {

	  		var callback = function(success, dataReturn) {
	  			players[socket.id] = dataReturn;

	  			socket.emit('welcome', {me: dataReturn, others:players});
	  			socket.broadcast.emit('newPlayer', {user: dataReturn, players: players});
	  		};
	  	gameManager.findCharacter(data.username, callback);
    });

    socket.on('move', function (data) {
	  		var callback = function(success, dataReturn) {
	  			if(success)
	  				players[socket.id] = dataReturn;
	  				socket.broadcast.emit('move', {players: players, user: { name: data.name, position: data.position}});
	  		};
	  	gameManager.changeCharacterPosition(data.name, data.position, callback);
    });

    socket.on('changeMap', function (data) {
	  		var callback = function(success, dataReturn) {
	  			if(success)
	  				players[socket.id] = dataReturn;
	  				socket.broadcast.emit('changeMap', {players: players, user: { name: data.name, map: data.map}});
	  		};
	  	gameManager.changeCharacterMap(data.name, data.map, callback);
    });

    socket.on('disconnect', function () {
    		var user = players[socket.id];
    		if(user && user.name){
		      players.splice(socket.id, 1);
	    		socket.broadcast.emit('playerleave', {players:players, user:{name: user.name}});
    		}
  	});

	});
};
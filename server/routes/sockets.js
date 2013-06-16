var character = {};
var gameManager = require('../modules/game.js');

exports.listen = function(io)
{	

	io.sockets.on('connection', function (socket) {
	  socket.on('iamanewboy', function (data) {
	  		var callback = function(success, dataReturn) {
	  			socket.emit('welcome', dataReturn);
	  			socket.broadcast.emit('newOtherPlayers', dataReturn);
	  		};
	
	  	gameManager.findCharacter(data.username, callback);
    });

    socket.on('move', function (data) {
	  		var callback = function(success, dataReturn) {
	  			if(success)
	  				socket.broadcast.emit('move', { name: data.name, map: data.map, position: data.position});
	  		};
	
	  	gameManager.changeCharacterPosition(data.username, data.map, data.position, callback);
    });

	});
};
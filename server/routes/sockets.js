var players = [];
var ids = [];
var gameManager = require('../modules/game.js');

exports.listen = function(io)
{	

	io.sockets.on('connection', function (socket) {
	  socket.on('iamanewboy', function (data) {
	  		var callback = function(success, dataReturn) {
	  			socket.emit('welcome', {me: dataReturn, others: players});
	  			socket.broadcast.emit('newOtherPlayers', dataReturn);
	  			players.push(dataReturn);
	  			ids.push(socket.id);
	  		};
	
	  	gameManager.findCharacter(data.username, callback);
    });

    socket.on('move', function (data) {
	  		var callback = function(success, dataReturn) {
	  			if(success)
	  				var i = ids.indexOf(socket.id);
				    if(i != -1) {
				      players[i] = dataReturn;
				    }
	  				socket.broadcast.emit('move', {players: players, user: { name: data.name, position: data.position}});
	  		};
	
	  	gameManager.changeCharacterPosition(data.name, data.position, callback);
    });

    socket.on('moveMap', function (data) {
	  		var callback = function(success, dataReturn) {
	  			if(success)
	  				var i = ids.indexOf(socket.id);
				    if(i != -1) {
				      players[i] = dataReturn;
				    }
	  				socket.broadcast.emit('moveMap', {players: players, user: { name: data.name, map: data.map}});
	  		};
	
	  	gameManager.changeCharacterMap(data.name, data.map, callback);
    });

    socket.on('disconnect', function () {
    	var i = ids.indexOf(socket.id);
	    if(i != -1) {
    		socket.broadcast.emit('playerleave', {name:players[i].name});
	      ids.splice(i, 1);
	      players.splice(i, 1);
	    }
  	});

	});
};
var character = {};
var gameManager = require('../modules/game.js');

exports.listen = function(io)
{	

	io.sockets.on('connection', function (socket) {
	  socket.on('iamanewboy', function (data) {
	  		var callback = function(success, dataReturn) {
	  			socket.emit('welcome', dataReturn);
	  		};
	  	console.log('REQUETE A LA BABSE AVEC : '+data.username);
	  	gameManager.findCharacter(data.username, callback);
    });

	});
};
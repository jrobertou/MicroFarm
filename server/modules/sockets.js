var Caracteres = [];

exports.listenning = function()
{
	io.sockets.on('connection', function (socket) {
		var idUser = socket.id;
		console.log(socket.id);
		socket.emit('hi', { id:idUser, others: Caracteres});

		socket.on('newUSer', function (data) {
			socket.broadcast.emit('newUser', { user: data.user});
			Caracteres[data.user.id] = data.user;
		});

		socket.on('disconnect', function () {
	    	io.sockets.emit('userDisconnected', {id:idUser});
	  	});

	});
};
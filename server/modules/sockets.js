var currentUser = null;

exports.setUser = function(user)
{	
	currentUser = user;
};

exports.listen = function(io)
{	
	var game = io
	  
	  .of('/game')

	  .on('connection', function (socket) {
	    	

	console.log("GAME CONNECTION");
	console.log(currentUser);

	    game.emit('hi', {
	        that: 'only'
	      , '/game': 'will get'
	      ,	user: currentUser
	    });
	    
	    game.emit('newUser', {
	        everyone: 'in'
	      , '/game': 'will get'
	    });

		  game.on('getMe', function (socket) {
				game.emit('youData', {
		        that: 'only'
		      , user: currentUser
		    });
	    });
	  
	  });


};
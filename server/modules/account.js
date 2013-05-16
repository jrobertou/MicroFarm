var userDb = require('../data/userDb.js');

exports.addUser = function(email, username, pass, repass, callback)
{
	if(pass === repass) {
		userDb.addUser({
			email: email,
			username: username,
			pass: pass
		}, callback);
	}else {
		callback(false, 'passwdsNoMatch');
	}
};

exports.logUser = function(username, pass, callback)
{
	userDb.findUser(username, pass, callback);		
};
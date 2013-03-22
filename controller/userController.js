var userDb = require('../server/userDb.js');

exports.addUser = function(email, username, pass, repass, callback)
{
	console.log('les pass sont: '+pass+'  --  '+repass);
	if(pass === repass) {
		userDb.addUser({
			email: email,
			username: username,
			pass: pass
		}, callback);
	}else {
		callback.fct(callback.context, false, 'passwdsNoMatch');
	}
}

exports.logUser = function(username, pass, callback)
{
	userDb.findUser(username, pass, callback);		
}

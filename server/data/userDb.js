var crypto 		= require('crypto')
var MongoDB 	= require('mongodb').Db;
var Server 		= require('mongodb').Server;
var moment 		= require('moment');

var dbPort 		= 27017;
var dbHost 		= 'localhost';
var dbName 		= 'MicroFarm';

/* establish the database connection */

var db = new MongoDB(dbName, new Server(dbHost, dbPort, {auto_reconnect: true}), {w: 1});
	db.open(function(e, d){
	if (e) {
		console.log(e);
	}	else{
		console.log('connected to database :: ' + dbName);
	}
});
var users = db.collection('users');

/* login validation methods */

exports.addUser = function(user, callback)
{
	if (user.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]{2,}[.][a-zA-Z]{2,4}$/)) {
		users.findOne({username:user.username}, function(error, obj) {
			if (obj){
				callback(false, 'usernameTaken');
			}
			else 
				{
					users.findOne({email:user.email}, function(error, obj) {
						if (obj){
							callback(false, 'emailTaken');
						}
						else
							{
							//saltAndHash(user.pass, function(hash){
							//	user.pass = hash;

								user.date = moment().format('MMMM Do YYYY, h:mm:ss a');
								users.insert(user, {safe: true}, function(err, object) {
						            if (err){
						                callback(false, err);
						            }else{
						                callback(true, user);
						            }
						        }
								);
							}
					});
				}
		});
	}else{
		callback(false, 'invalidEmail');
	}
}

exports.findUser = function(username, pass, callback)
{
	users.findOne({username:username}, function(error, obj) {

		if(obj){
			if(obj.pass == pass && obj.username == username){
				callback(true, obj);
			}else{
				callback(false, 'wrongPass');
			}
		}else{
			callback(false, 'usernameNoTaken');
		}
	});
}

var crypto 		= require('crypto')
var MongoDB 	= require('mongodb').Db;
var Server 		= require('mongodb').Server;
var moment 		= require('moment');

var dbPort 		= 27017;
var dbHost 		= 'localhost';
var dbName 		= 'simple-login';

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
	users.findOne({username:user.username}, function(error, obj) {
		if (obj){
			callback('username-taken');
		}
		else
			{
				users.findOne({email:user.email}, function(error, obj) {
					if (obj){
						callback('email-taken');
					}
					else
						{
						//saltAndHash(user.pass, function(hash){
						//	user.pass = hash;

							user.date = moment().format('MMMM Do YYYY, h:mm:ss a');
							users.insert(user, {safe: true}, callback);
						}
				});
			}
	});
}

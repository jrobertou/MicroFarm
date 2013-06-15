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
var characters = db.collection('game');

exports.add = function(username)
{
	var newPlayer = {
		name: username,
		gold: 5000,
		position: {x:1, y:1},
		map: '00'
	};

	characters.insert(user, {safe: true}, function(err, object) {
        if (err){
            callback(false, err);
        }else{
            callback(true, user);
        }
    }
	);
}

exports.findOne = function(username)
{
	characters.findOne({username:username}, function(error, obj) {

		if(obj){
			if(obj.username == username){
				callback(true, obj);
			}else{
				callback(false, 'wrongPass');
			}
		}else{
			callback(false, 'usernameNoTaken');
		}
	});
}

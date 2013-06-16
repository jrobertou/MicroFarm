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
var characters = db.collection('characters');

exports.add = function(username, callback)
{
	var newCharacter = {
		name: username,
		gold: 5000,
		level: 'easy',
		position: {x:15, y:6},
		map: '0:1'
	};

	characters.insert(newCharacter, {safe: true}, function(error, object) {
        if (error){
            callback(false, error);
        }else{
            callback(true, newCharacter);
        }
    }
	);
}

exports.find = function(username, callback)
{
	characters.findOne({name: username}, function(error, obj) {
		if(obj){
			if(obj.name === username){
				callback(true, obj);
			}else{
				callback(false, 'no same usernames');
			}
		}else{
			callback(false, error);
		}
	});
}

exports.changePosition = function(name, position, callback)
{
	characters.findAndModify({name: name}, [['_id','asc']], {$set: {position: position}}, {},
        function(err, object) {
            if (err){
                callback(false, object);
            }else{
                callback(true, object);
            }
        });
}

exports.changeMap = function(name, map, callback)
{
	characters.findAndModify({name: name}, [['_id','asc']], {$set: {map: map}}, {},
        function(err, object) {
            if (err){
                callback(false, object);
            }else{
                callback(true, object);
            }
        });
}

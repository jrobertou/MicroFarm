var characterDb = require('../data/charactersDb.js');

exports.addCharacter = function(username, callback)
{
	characterDb.add(username, callback);
};

exports.findCharacter = function(username, callback)
{
	characterDb.find(username, callback);		
};

exports.changeCharacterPosition = function(username, map, position, callback)
{
	characterDb.changePosition(username, map, position, callback);		
};
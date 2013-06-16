var characterDb = require('../data/charactersDb.js');

exports.addCharacter = function(username, callback)
{
	characterDb.add(username, callback);
};

exports.findCharacter = function(username, callback)
{
	characterDb.find(username, callback);		
};

exports.changeCharacterPosition = function(username, position, callback)
{
	characterDb.changePosition(username, position, callback);		
};

exports.changeCharacterMap = function(username, map, callback)
{
	characterDb.changeMap(username, map, callback);		
};
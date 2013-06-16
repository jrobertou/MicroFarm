var characterDb = require('../data/charactersDb.js');

exports.addCharacter = function(username, callback)
{
	characterDb.add(username, callback);
};

exports.findCharacter = function(username, callback)
{
	characterDb.find(username, callback);		
};
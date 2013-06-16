var accountManager = require('../modules/account.js'),
  callbackMessage = require('../helpers/callbackMessage.js'),
  gameManager = require('../modules/game.js');

var validMessage = callbackMessage.validMessage,
  errorMessage = callbackMessage.errorMessage;

exports.signup = function(req, res)
{
	var email = req.body.email,
		username = req.body.username,
		pass = req.body.pass,
		repass = req.body.repass;

	var callback = function(valid, returnMessage){
      var feedback = 'Une erreur est survenue';
      if(valid){
        feedback = validMessage['addUsername'];
        gameManager.addCharacter(returnMessage.username, function(success, back){});
      }else{
        if(typeof(returnMessage) === "string"){
          feedback = errorMessage[returnMessage];
        }else{
          feedback = returnMessage;
        }
      }
      res.render('index', {feedback:feedback, log: false});
    };
	accountManager.addUser(email, username, pass, repass, callback);
};

exports.login = function (req, res) 
{
	var username = req.body.username, pass = req.body.pass;

  var loginCallback = function(valid, response){

    if(valid){

      var user = response;
      user.pass = pass;
      res.cookie('username', user.username);
      req.session.user = user;
      res.redirect("/profil");
      var feedback = null;

    }else{

      if(typeof(response) === "string"){

        feedback = errorMessage[response];

      }else{

        feedback = 'Une erreur est survenue';

      }

      res.render('index', {user: user, feedback: feedback, log: true});
    }
  };
	accountManager.logUser(username, pass, loginCallback);
};


exports.logout = function (req, res) 
{

	if(req.session && req.session.user){

		req.session.user = null;

	}
	res.redirect("/");

};
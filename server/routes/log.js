var accountManager = require('../modules/account.js'),
  callbackMessage = require('../helpers/callbackMessage.js'),
  socketio = require('../modules/sockets.js');

var validMessage = callbackMessage.validMessage,
  errorMessage = callbackMessage.errorMessage;

exports.signup = function(req, res)
{
	var email = req.body.email,
		username = req.body.username,
		pass = req.body.pass,
		repass = req.body.repass;

	var callback = function(valid, error){
      var feedback = 'Une erreur est survenue';
      if(valid){
        feedback = validMessage['addUsername'];
      }else{
        if(typeof(error) === "string"){
          feedback = errorMessage[error];
        }else{
          feedback = error;
        }
      }
      res.render('index', {feedback:feedback, log: false});
    }; 
  console.log("try to register a new user: ");
  console.log("email:"+email+", username:"+username+", pass:"+pass+", repass:"+repass+"");
	accountManager.addUser(email, username, pass, repass, callback);
};

exports.login = function (req, res) 
{
	var username = req.body.username, pass = req.body.pass;

  var loginCallback = function(valid, response){

    if(valid){

      var user = response;
      user.pass = pass;
      res.cookie('user', user, { maxAge: 900000 });
      socketio.setUser(user);
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
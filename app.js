
/**
 * Module dependencies.
 */

var express = require('express'),
    userController = require('./controller/userController.js'),
    render = require('./render/'),
    http = require('http'),
    path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3030);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'chut-secret' }));
  app.use(express.methodOverride());
  //app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var errorMessage = {
  'passwdsNoMatch': 'passwds-no-match',
  'usernameTaken': 'username-taken',
  'emailTaken': 'email-taken',
  'invalidEmail': 'email-invalid',
  'usernameNoTaken': 'usernameNoTaken',
  'wrongPass': 'wrongPass'

};

var validMessage = {
  'addUsername': 'Votre user a été créer, vous pouvez maintenant vous loguer'
};

app.get('/', function(req, res){
	var currentuser = null;

	if(req.session && req.session.user){
		res.redirect('/profil');
	}else
	{
		//autoLogin();
		render.index(req, res, null, null);
	}
});


app.get('/profil', function(req, res){
	var currentuser = null;

	if(req.session && req.session.user){
		currentuser = req.session.user;
		var email = null;
		var username = null;
		console.log(req.session.user);

		res.render('profil.jade', {
			title: 'µFarm', 
			username: req.session.user.username,
			email: req.session.user.email
			});

	}else
	{
		res.redirect("/");
	}
});

app.post('/signup', function(req, res) {
  console.log("new user");
  var email = req.body.email,
      username = req.body.username,
      pass = req.body.pass,
      repass = req.body.repass;

  userController.addUser(email, username, pass, repass,{context:res, fct:

    function(context, valid, options){
      options.signupFeedback = 'Une erreur est survenue';
      if(valid){
        options.signupFeedback = validMessage['addUsername'];
      }else{
        if(options.id){
          options.signupFeedback = errorMessage[options.id];
        }else{
          options.signupFeedback = errorMessage[options.error.id];
        }
      }
      options.title = 'µFarm';

      context.render('index', options);
    }}
  );
});

app.post("/login", function (req, res) {
  var username = req.body.username, pass = req.body.pass;

			userController.logUser(username, pass, function(valid, user){   
      if(valid){
        res.cookie('user', user, { maxAge: 900000 });
        req.session.user = user;
        res.redirect("/profil");
      }else{
        if(user.id){
          user.signupFeedback = errorMessage[user.id];
        }else{
          user.signupFeedback = 'Une erreur est survenue';;
        }
	      user.title = 'µFarm';
	      res.render('index', user);
      }
    }
  );
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

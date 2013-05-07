
/**
 * Module dependencies.
 */

var express = require('express'),
    userController = require('./controller/userController.js'),
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

app.get('/', function(req, res){

var callbackMessage = require('./helpers/callbackMessage.js'),
  validMessage = callbackMessage.validMessage,
  errorMessage = callbackMessage.errorMessage;

  if(req.session && req.session.user){
    res.redirect('/profil');
  }else
  {
    userController.autoLogin(req.cookies, function(valid, user){   
      if(valid){
        user.pass = pass;
        res.cookie('user', user, { maxAge: 900000 });
        req.session.user = user;
        res.redirect("/profil");
      }else{
        if(user.id){
          user.feedback = errorMessage[user.id];
        }else{
          user.feedback = 'Une erreur est survenue';;
        }
        res.render('login', user);
      }
    });
    res.render('index', {feedback: null});
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

  userController.addUser(email, username, pass, repass,
    function(valid, options){
      options.feedback = 'Une erreur est survenue';
      if(valid){
        options.feedback = validMessage['addUsername'];
      }else{
        if(options.id){
          options.feedback = errorMessage[options.id];
        }else{
          options.feedback = errorMessage[options.error.id];
        }
      }
      res.render('index', options);
    }
  );
});

app.post("/login", function (req, res) {
  var username = req.body.username, pass = req.body.pass;

			userController.logUser(username, pass, function(valid, user){   
      if(valid){
        user.pass = pass;
        res.cookie('user', user, { maxAge: 900000 });
        req.session.user = user;
        res.redirect("/profil");
      }else{
        if(user.id){
          user.feedback = errorMessage[user.id];
        }else{
          user.feedback = 'Une erreur est survenue';;
        }
        res.render('index', user);
      }
    });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


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
  app.use(express.methodOverride());
  //app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', render.index);
app.get('/signup', render.index);
app.get('/login', render.index);


app.post('/signup', function(req, res) {
  console.log("new user");
  var email = req.body.email,
      username = req.body.username,
      pass = req.body.pass,
      repass = req.body.repass;

  userController.addUser(email, username, pass, repass,
    function(string){
      console.log('callback du serveur : ' + string);
    });
  
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

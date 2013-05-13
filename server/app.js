
/**
 * Module dependencies.
 */

var express = require('express'),
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
  app.use(express.static(path.join(__dirname, '../public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var main = require('./routes/main.js'),
  log = require('./routes/log.js'),
  profil = require('./routes/profil.js');

var callbackMessage = require('./helpers/callbackMessage.js');
var validMessage = callbackMessage.validMessage,
  errorMessage = callbackMessage.errorMessage;

app.get('/', main.get);
app.get('/profil', profil.get);
app.post('/signup', log.signup);
app.post("/login", log.login);
app.get('/logout', log.logout);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
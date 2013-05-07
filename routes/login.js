
exports.login = function(req, res){

  app.get('/login', function(req, res){

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
          user.title = 'µFarm';
          res.render('login', user);
        }
      });
      res.render('login', {title: 'µFarm', feedback: null});
    }
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
          user.title = 'µFarm';
          res.render('login', user);
        }
      });
  });

};
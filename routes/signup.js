app.get('/signup', function(req, res){

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
    res.render('signup', {title: 'µFarm', feedback: null});
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
      options.title = 'µFarm';

      res.render('signup', options);
    }
  );
});
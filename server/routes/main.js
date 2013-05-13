exports.get = function(req, res)
{
  if(req.session && req.session.user){
    res.redirect('/profil', {logout: true});
  }
  else
  {/*
    accountManager.autoLogin(req.cookies, function(valid, user){   
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
    });*/
    res.render('index', {feedback: null, logout: false});
  }
};
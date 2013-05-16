exports.get = function(req, res)
{
  if(req.session && req.session.user){
    res.redirect('/profil');
  }
  else {
    res.render('index', {feedback: null, logout: false});
  }
};
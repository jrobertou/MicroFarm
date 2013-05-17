exports.get = function(req, res)
{
  if(req.session && req.session.user){
    res.render('game', {log: true});
  }
  else {
    res.render('index', {feedback: null, log: false});
  }
};
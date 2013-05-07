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

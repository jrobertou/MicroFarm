exports.get = function(req, res)
{
	if(req.session && req.session.user){

		var currentuser = req.session.user;
    	console.log(currentuser);
		res.render('profil', {user: currentuser, log: true});

	}
	else {
		res.redirect("/");
	}
};
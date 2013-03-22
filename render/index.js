
/*
 * GET home page.
 */

exports.index = function(req, res, signupFeedback, loginFeedback){

	signupFeedback = signupFeedback?signupFeedback:null;
	loginFeedback = loginFeedback?loginFeedback:null;

	res.render('index', {title: 'µFarm',signupFeedback: signupFeedback,loginFeedback: loginFeedback});
};
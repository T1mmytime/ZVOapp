

module.exports = function (req, res ,ok){
	//gebruiker mag doorgaan
	if(req.session.User && req.session.User.admin){
		return ok();
	}

	//geen toegan, melding geven en opnieuw laten inloggen.
	else{
		var requireAdminError = [{name: 'requireAdminError', message: 'Administrator rechten nodig!'}]
		req.session.flash = {
			err:requireAdminError
		}
		res.redirect('/session/new');
		return;
	}
};	

module.exports = function(req, res, ok){

	var sessionUserMatchesId = req.session.User.id == req.param('id');
	var isAdmin = req.session.User.admin;

	//geen admin en opgevraag id is niet in overeenstemming met het id van de gebruiker.
	if (!(sessionUserMatchesId || isAdmin)){
		var noRightsError = [{name: 'noRights', message: 'Je moet een admin zijn'}]
		req.session.flash = { 
			err: noRightsError
		}
		res.redirect('/session/new');
		return;
	}
	ok();
};
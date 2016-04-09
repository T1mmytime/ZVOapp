/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	'new': function(req, res){

	//levensduur van sessie
		//var oldDateObj = new Date();
		//sessie tijd = 60 sec
		//var newDateObj = new Date(oldDateObj.getTime() + 60000);
		//req.session.cookie.expires = newDateObj;
	  	//req.session.authenticated = true;
	  	//console.log(req.session);	
	  	res.view('session/new');
	},
	
	create: function(req, res, next){
		//kijk of email en paswoord zijn ingegeven
		if(!req.param('email') || (!req.param('paswoord'))){
			
			var GebruikerPasError = [{name:'GebruikerPas', message: 'Gelieve het paswoord en de gebruikersnaam in te voeren'}]

				req.session.flash ={
					err: GebruikerPasError
				}
			res.redirect('/session/new');
			return;
		}

		//Zoek de gebruiker op basis van zijn email address.
		User.findOneByEmail(req.param('email'), function gevondenGebruiker(err, user){
			if (err) return next(err);

			//als er geen gebruiker gevonden is
			if(!user){
				var geenAccError = [{name: 'geenAcc', message: 'de gebruiker ' + req.param('email') + ' is niet gevonden.'}]
				req.session.flash = {
					err: geenAccError
				}
				res.redirect('session/new');
				return;
			}
			var bcrypt = require('bcryptjs');
			bcrypt.compare(req.param('paswoord'), user.gencrypteerdPaswoord, function(err,valid){
				if(!valid){
				var foutiefPasError = [{name: 'foutiefPas', message: 'Het opgegeven paswoord is incorrect'}]
					req.session.flash = {
						err: foutiefPasError
					}
				res.redirect('session/new');
				return;
				}

			req.session.authenticated = true;
			req.session.User = user;

			// zet status op online
			user.online = true;
			user.save(function(err, user){
				if(err) return next(err);

			//als gebruiker een admin is dan wordt hij doorverwezen naar het gebruikers overzicht
			if (req.session.User.admin) {
				res.redirect('/user');
				return;
			}

			res.redirect('/user/show/' + user.id);
			});
		});
	  });	
	},

	logout: function (req, res, next){

		User.findOne(req.session.User.id, function foundUser(err, user){
			var userId = req.session.User.id;
			
			//de gebruiker is aan het uiloggen dus zet zijn status op offline
			User.update(userId, {
				online: false
			},	
				//wis de sessie van de gebruiker en stuur hem terug naar de homepage
			function (err){
				if (err) return next(err);
				req.session.destroy(); 
				res.redirect('/');
		});
	});
  }
};


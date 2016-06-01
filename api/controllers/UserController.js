/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	/*'new': function(req, res){
		res.locals.flash = _.clone(req.session.flash);
		res.view();
		req.session.flash = {};
	},

	create: function(req, res, next){

		//Maak een gebruiker met da parameters van 
		//het signup form -> new.ejs

		var userObj ={
			name: req.param('name'),
			email: req.param('email'),
			paswoord: req.param('paswoord'),
			pasBevestiging: req.param('pasBevestiging')
		}


		User.create( userObj, function userCreated(err, user){
			// in geval van een error
			if (err) {
				console.log(err);
				req.session.flash = {
					err: err
				}
			//in geval van error gebruiker terug sturen naar signup pagina
			return res.redirect('/user/new');
			}

			req.session.authenticated = true;
			req.session.User = user;
			//Als het aanmaken succesvol -> show action
			
			// zet status op online
			user.online = true;
			user.save(function(err, user){
				if(err) return next(err);
			
			//res.json(user);
			//req.session.flash = {};
			//stuur gebruiker naar profiel pagina
			res.redirect('/user/show/'+ user.id);
			});
		});
	},
	
	//view/show.ejs
	show: function (req, res, next){
		User.findOne(req.param('id'), function foundUser(err, user){
			if(err) return next(err);
			if(!user) return next();
			res.view({
				user: user
			});
		});
	},

	index: function(req,res,next){


		//console.log(new Date());
		//console.log(req.session.authenticated);
		//geef een array van alle gebruikers in de tabel
		User.find(function foundUser (err,users){
			if (err) return next(err);
			// geef het array door aan de view index.ejs
			res.view({
				users: users
			});
		});
	},
	*/

	edit: function(req,res,next){
		User.findOne(req.param('id'), function foundUser(err, user){
			if (err) return next(err);
			if (!user) return next('User doesnn\'t exist.');

			res.view({
				user: user
			});
		});
	},

	update: function(req,res,next){

		//Extra beveiliging zodat een standaard gebruiker zichzelf geen admin kan maken
		if(req.session.User.admin){
			var userObj = {
				name: req.param('name'),
				title: req.param('title'),
				email: req.param('email'),
				admin: req.param('admin')
			}
		} else {
			var userObj = {
				name: req.param('name'),
				title: req.param('title'),
				email: req.param('email'),
			}
		}

		User.update(req.param('id'), userObj, function userUpdate(err){
			if (err){
				return res.redirect('/user/edit/'+req.param('id'));
			}			
			res.redirect('/user/show/' +req.param('id'));
		});
	},

	destroy: function(req,res,next){
		User.findOne(req.param('id'), function foundUser(err, user){
			if (err) return next(err);

			if (!user) return next('User doesn\'t exist.');

			User.destroy(req.param('id'), function userDestroyed(err){
				if(err) return next(err);
			});
			res.redirect('/user');
		});
	},

	getRapporten: function(req,res){
		User.findOne({
				id: req.param('id')
			})
			.populate('rapportVan')
			.exec(function vindRapport(err, user){
				if(err){
              	return res.negotiate(err);
              }
              	if(!user){
              		return res.notFound('User niet gevonden');
              }

            //  return res.json(user.rapportVan);
              var rapporten = [];
				user.rapportVan.forEach(function(rapport){
						rapporten.push(_.get(rapport, ['id']));
				})
			  var resultaten = [];
             
              
              var alleRapporten = [];
              var compactrapport = [];

              async.eachSeries(rapporten, function( rapport, klaar){
			  
			  Rapport.findOne(rapport)
			    	.populateAll()
			    	.exec(function rappor(err, rpprt){
							if(err) return next(err);
							
							resultaten = rpprt.resultaten;	
														
						//	});
							var resultatenArray = [];

								async.eachSeries(resultaten, function(resultaat, klaarb){
									var resultaatOBJ;							

									Oefening.findOne(resultaat.oefeningID)
									.exec(function oef(err,oefening){
										if(err) return next(err);
										if(!oefening) return res.notFound('Oefening niet gevonden');
										resultaatOBJ ={
											resultaat: resultaat.resultaat,
											oefening: oefening.naam,
											beschrijving: oefening.beschrijving
										}
										console.log('callbackB');
										resultatenArray.push(resultaatOBJ);		
										klaarb();
									});																							
								},function(err){
									console.log('finnishB')	
									rapportOBJ ={
										commentaar: rpprt.commentaar,
										naam: rpprt.naam,
										resultaten: resultatenArray
									}	
									compactrapport.push(rapportOBJ);
									klaar();	
								})	
						console.log('callbackA');
					//	rapporten = {rapporten: compactrapport};
								
					});
				},function(err){
					console.log('finnishA');
					ALLErapporten = {rapporten: compactrapport};	
					res.json(ALLErapporten);				
				});
			});
	}

};


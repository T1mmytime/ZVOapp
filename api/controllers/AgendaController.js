/**
 * AgendaController
 *
 * @description :: Server-side logic for managing Agenda
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('lodash');

module.exports = {
	

	//Voeg een agenda moment toe 

	

	//Maakt het mogelijk een planning toe te voegen
	//@ parmams: 
	//  begin -> begintijd van de les
  	//	einde -> eindtijd van de les				
  	//	trainerID -> gebruikersID van de trainer die les geeft
  	//	redderID -> gebruikersID van de redder
  	//	groepID -> ID van de groep waaraan les gegeven moet worden
  	addPlanning: function(req, res){
  	
  		var train, red;

		var agendaOBJ={
			tijdstip: '2016-08-20 15:30:00',
			eindtijd: '2016-08-20 17:30:00',
			trainer: req.param('trainerID'),
			redder: req.param('redderID'),
			groep: req.param('groepID')
		}
		
		User.findOne({id: req.param('redderID')})
			.populate('rolID')
			.exec(function(err,gebruiker){
				if(err)	return res.negotiate(err);
				if(!gebruiker) return res.json(401, {err:'Geen gebruiker gevonden'});
				if(!gebruiker.isRedder()) return res.json(401, {err:'De opgegeven redder is geen redder'});
				
				else User.findOne({id: req.param('trainerID')})
					.populate('rolID')
					.exec(function(err,gebruiker){
					if(err)	return res.negotiate(err);
					if(!gebruiker) return res.json(401, {err:'Geen gebruiker gevonden'});
					if(!gebruiker.isTrainer()) return res.json(401, {err:'De opgegeven trainer is geen trainer'});
				
			
					else Agenda.create(agendaOBJ, function userCreated(err, planning){
			
						if(err) return res.negotiate(err);
						planning.save(function(err, plng){
							if(err) return next(err);
							//return	res.json(planning);
							Groep.findOne({id: req.param('groepID')})
							.populateAll()
							.exec(function geefGroep(err, groep){
								if(err) return res.negotiate(err);
								if(!groep) return res.json(401, {err:'groep niet gevonden'});
								var gebruikers = [];
								groep.deelnemers.forEach(function(gebruiker){
									gebruikers.push(_.get(gebruiker, ['id']));
								})

								var aanwezigheidslijstOBJ = {
									planning: planning.id,
									aanwezigen: gebruikers
								}
								Aanwezigheid.create(aanwezigheidslijstOBJ, function Created(err, lijst){
							
										if(err) return res.negotiate(err);
										lijst.save(function(err, lst){
											if(err) return next(err);
										});
										

								async.each(gebruikers, function( gebruiker, klaar){
									var statusOBJ= {
											 	aanwezigheidID: lijst.id,
											    gebruikerID: gebruiker
											}
									Aanwezigheidsstatus.create(statusOBJ, function Created(err, status){
													status.save(function(err,sts){
													if(err) return next(err);
													//res.json(statusOBJ);										
													});
										klaar(err,status);
									});

								},function(err){
									res.send('succes');
								});
							});
						});
					});
				});
			});
		});		
	},

	//Geeft de ingeplanda datums terug van een groep
	getGroepIcal: function(req, res){
		Groep.findOne({id: req.param('groepID')})
			.populate('agendaPunt')
			//.populate('deelnemers')
			.exec(function groepGevonden(err,groep){
			if(err) return res.negotiate(err);
			if(!groep) return res.json(401, {err:'groep niet gevonden'});
			res.json(groep.agendaPunt);
				
	 	});
	},

	//test methode wordt nadien functionaliteit in "addplanning"
	getGroepDeelnemers: function(req, res){
		
	}	
};


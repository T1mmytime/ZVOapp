/**
 * AgendaController
 *
 * @description :: Server-side logic for managing Agenda
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

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
  		var _ = require('lodash');
  		var train, red;

		var agendaOBJ={
			tijdstip: '2016-08-20 15:30:00',
			eindtijd: '2016-08-20 17:30:00',
			trainer: req.param('trainerID'),
			redder: req.param('redderID'),
			groep: req.param('groepID')
		}
		

		Agenda.create(agendaOBJ, function userCreated(err, planning){
			// in geval van een error
			if(err) return res.negotiate(err);

			User.findOne({id: req.param('redderID')})
			.populate('rollen')
			.exec(function(err,gebruiker){
				if(err)	return res.negotiate(err);
				if(!gebruiker) return res.send('Geen gebruiker gevonden');
				if(!gebruiker.isRedder()) return res.send('De opgegeven redder is geen redder');
			})
			User.findOne({id: req.param('trainerID')})
				.populate('rollen')
				.exec(function(err,gebruiker){
				if(err)	return res.negotiate(err);
				if(!gebruiker) return res.send('Geen gebruiker gevonden');
				if(!gebruiker.isTrainer()) return res.send('De opgegeven trainer is geen trainer');
			})
			
			planning.save(function(err, planning){
				if(err) return next(err);
					res.json(planning);
			})
		});		
	},

	getGroepIcal: function(req, res){
		Groep.findOne({id: req.param('groepID')})
			.populate('agendaPunt')
			.exec(function groepGevonden(err,groep){
			if(err) return res.negotiate(err);
			if(!groep) return res.send('groep niet gevonden');
			res.json(groep.getAgendaPunten());
			})
	}

};


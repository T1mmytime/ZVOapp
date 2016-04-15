/**
 * RaportController
 *
 * @description :: Server-side logic for managing Raports
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	addRapport: function(req, res){
		
		Rapport.create({
			name: req.param('naam'),
			examenID: req.param('examenID'),
			zwemmerID: req.param('zwemmerID')
			},
			function voegRapportToe(err, rapport){
              
              if(err){
              	//console.log(err);
              	return res.negotiate(err);
              }

              res.send('rapport met id ' + rapport.id + ' succesvol toegevoegd.');
        });        
	},

    getRapport: function(req, res){

		Rapport.findOne({
			examenID: req.param('examenID'),
			zwemmerID: req.param('zwemmerID')
			},
			function vindRapport(err, rapport){
				if(err){
              	return res.negotiate(err);
              }
              	if(!rapport){
              		return res.notFound('Rapport niet gevonden');
              }

              return res.json(rapport);
			});

	},

	/*//geefAlle rapporten van een zwemmer of een Examen
	getAlleRapporten: function(req, res){
		
		if(req.param('zwemmerID'){
			Rapport.query(
				('SELECT ' + req.param('zwemmerID') + ' FROM Rapport'),
				function vindAlleRapporten(err, rapport) {
	  			if (err) return res.serverError(err);
	  			return res.json(rapport);
			});
		}
		/*if(req.param('examenID')){
			Rapport.query(
				('SELECT ' + req.param('examenID') + ' FROM Rapport'),
				function vindAlleRapporten(err, rapport) {
	  			if (err) return res.serverError(err);
	  			return res.json(rapport);
			});
		}
  	}

  	/*weizigRapport: function(req, res){
  		Rapport.update({
  			name: req.param('naam')
  		},
  		{
  			name: req.param('nieuweNaam'),
  			beschrijving: req.param('nieuweBeschrijving')
  		},
  		function WeizigOef(err, oefening) {
  			if (err) return res.serverError(err);
  			return res.json(oefening);
  		});
  }*/
};


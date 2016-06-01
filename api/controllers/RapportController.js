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
			zwemmerID: req.param('zwemmerID'),
			planningID: req.param('planningID'),
			trainerID: req.param('trainerID')
			},
			function voegRapportToe(err, rapport){
              
              if(err){
              	//console.log(err);
              	return res.negotiate(err);
              }

              res.send('rapport met id ' + rapport.id + ' succesvol toegevoegd.');
        });        
	},

	addExamenResultaten: function(req, res){
		
		Rapport.update({zwemmerID: req.param('zwemmerID'),planningID: req.param('planningID')},{commentaar: req.param('commentaar')})
				.exec(function(err,rapport){
					if(err) return res.negotiate(err);

					//json body met oef id en bephaalde resultaat op deze oefening.

					var resultatenOBJ = req.body;

					async.each(resultatenOBJ, function( resultaten, klaar){
					
					var rapportresOBJ = {
						rapportID: rapport.id,
						oefeningID: resultaten.oefid,
						resultaat:  resultaten.resultaat
					}

					Rapportresultaten.create(rapportresOBJ, function Created(err, rapres){
							rapres.save(function(err,rap){
							if(err) return next(err);
							});
							klaar(err,rapres);
						});

					},function(err){
						res.send('succes');
					}); 
		});
	},
		

    getRapport: function(req, res){

		Rapport.findOne({
				id: req.param('rapportID')
			})
			.populate('resultaten')
			.exec(function vindRapport(err, rapport){
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


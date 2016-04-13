/**
 * OefeningController
 *
 * @description :: Server-side logic for managing Oefenings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	

	addOefening: function(req, res){
		
		Oefening.create({
			name: req.param('naam'),
			beschrijving: req.param('beschrijving')
			},
			function voegOefeningToe(err, oefening){
              
              if(err){
              	//console.log(err);
              	return res.negotiate(err);
              }

              res.send('Oefening ' + oefening.id + ' succesvol toegevoegd.');
        });        
	},

	getOefening: function(req, res){

		Oefening.findOne({
			name: req.param('naam')
			},
			function vindOefening(err, oefening){
				if(err){
              	return res.negotiate(err);
              }
              	if(!oefening){
              		return res.notFound('Oefening niet gevonden');
              }

              return res.json(oefening);
			});

	},

	getAlleOefeningen: function(req, res){
		Oefening.query(
			'SELECT * FROM Oefening',
			function vindAlleOefeningen(err, oefeningen) {
  			if (err) return res.serverError(err);
  			return res.json(oefeningen);
		});
  	},

  	weizigOefening: function(req, res){
  		Oefening.update({
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
  	}
};


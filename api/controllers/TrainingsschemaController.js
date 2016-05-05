/**
 * SchemaController
 *
 * @description :: Server-side logic for managing Schemata
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('lodash');

module.exports = {

	addTrainingSchema: function(req, res){
		

		var schemaOBJ = {
			naam: req.param('naam'),
			beschrijving: req.param('beschrijving'),
			auteur: req.param('auteur')
		}
		Trainingsschema.create(schemaOBJ, function Created(err, schema){
	
				if(err) return res.negotiate(err);
				schema.save(function(err, sch){
					if(err) return next(err);
				});
				
		

			var oefeningenOBJ = req.body;//{
				/*oefeningen: req.body(oefeningen.oef),
				volgorde: req.body(oefeningen.volgorde),
				duur: req.body(oefeningen.duur)
			}*/

			async.each(oefeningenOBJ, function( oefening, klaar){
				
				var schemaOefOBJ = {
					schemaID: schema.id,
					oefeningID: oefening.id,
					tijdsduur:  oefening.duur,
					volgorde: oefening.volgorde 
				}

				SchemaOefeningen.create(schemaOefOBJ, function Created(err, schoef){
									schoef.save(function(err,shf){
									if(err) return next(err);
									//res.json(statusOBJ);										
									});
						klaar(err,schoef);
					});

				},function(err){
					res.send('succes');
				});  
		});  
	},

	getTrainingSchema: function(req,res){
		Trainingsschema.findOne({id: req.param('schemaID')})
			.populateAll()
			//.populate('deelnemers')
			.exec(function schemaGevonden(err,schema){
			if(err) return res.negotiate(err);
			if(!schema) return res.json(401, {err:'schema niet gevonden'});
		/*	var schemaOefeningen = [],
				oefeningenOBJ = [];
			schemaOefeningen = _.get(schema.oefeningen,['oefening']);
		   	
		 
			async.each(schemaOefeningen,function(oefening, cb){
				Oefening.findOne({id:oefening}).exec(function(err,oefn){
					if(err) cb(err);
					oefeningenOBJ.push(oefn);

					
				});
			}, function(err){

			      	var trainingsschemaOBJ ={
					agendaMoment: schema.agendaMoment,
					naam: schema.naam,
					oefeningen: oefeningenOBJ
					}*/
					res.json(schema); 
			});				
	}
};


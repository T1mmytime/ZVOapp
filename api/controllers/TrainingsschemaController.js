/**
 * SchemaController
 *
 * @description :: Server-side logic for managing Schemata
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('lodash');

module.exports = {

	addTrainingSchema: function(req, res){
		
	    var oefeningenJson = {
		 	oefening: [,2,3,4,5],
			herhalingen: [2,2,2,2,2]
		}

		Trainingsschema.create({
	
			naam: 'testSchema',
			oefeningen: oefeningenJson,
			agendaMoment: '1'
			},
			function voegSchemaToe(err, schema){
              
              if(err){
              	//console.log(err);
              	return res.negotiate(err);
              }

              res.json(schema);
        });        
	},

	getTrainingSchema: function(req,res){
		Trainingsschema.findOne({id: req.param('schemaID')})
			.populateAll()
			//.populate('deelnemers')
			.exec(function schemaGevonden(err,schema){
			if(err) return res.negotiate(err);
			if(!schema) return res.json(401, {err:'schema niet gevonden'});
			var schemaOefeningen = [],
				oefeningenOBJ = [];
			schemaOefeningen = _.get(schema.oefeningen,['oefening']);
		   	
		  //  schemaOefeningen.forEach(function(oef){
			/*for ( var i = 0 ; i < schemaOefeningen.length ; i ++){
					var test;
					Oefening.findOne({id: schemaOefeningen[i]})
					.exec(function(err, oefn){
						if(err) return res.negotiate(err);
						if(!oefn) test = 'niets';
						test = 'succes';
					})
					oefeningenOBJ.push(1);
		    	//	oefeningenOBJ.push(oef);
			};*/
	/*		async.map(schemaOefeningen, function teller(oef, mapCB){
	
				Oefening.find(id: oef).exec(function(err,oefn){
					if(err) return mapCB(err);
					oefeningenOBJ.push(oefn);
				});
			});*/
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
					}

					res.json(oefeningenOBJ);
				   

			});
				
			

			
			

			
				
	 	});
	}
};


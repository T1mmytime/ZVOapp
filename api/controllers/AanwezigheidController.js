/**
 * AanwezigheidController
 *
 * @description :: Server-side logic for managing Aanwezigheids
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	getAanwezigheidslijst: function(req,res){
		Aanwezigheid.findOne({planning: req.param('planningID')})
			.populate('statussen')
			.exec(function callback(err,lijst){
			if(err) return res.negotiate(err);
			if(!lijst) return res.json(401, {err:'Aanwezigheidslijst niet gevonden'});
					res.json(lijst); 
			});				
	},

	updateAanwezigheidslijst: function(req,res){
		
		var statusOBJ = req.body;

			async.each(statusOBJ, function( statusobj, klaar){
				Aanwezigheidsstatus.update({aanwezigheidID: req.param('lijstID'),gebruikerID: statusobj.gebruikerID},{status: statusobj.status})
					.exec(function(err,rapport){
					if(err) return res.negotiate(err);
						klaar(err,statusobj);
					});

				},function(err){
					res.send('succes');
			}); 
	
	}
};


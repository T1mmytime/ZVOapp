/**
 * Agenda.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  		tijdstip: {
  			type: 'datetime',
  			required: true 
  		},

  		schemaID: {
      		model: 'trainingsschema'
    	},

    	eindtijd: {
    		type: 'datetime',
    		required: true
    	},

    	groep: {
    		model: 'groep'
    	},

    	trainer: {
    		model: 'user',
    		required: true
    	},

    	redder: {
    		model: 'user',
    		required: true
    	},

      aanwezigheidsID: {
        collection: 'aanwezigheid',
        via: 'planning'
      },

      rapport: {
        collection: 'rapport',
        via: 'planningID'
      }/*,

      beforeCreate: function(cb){
        Groep.findOne({id: '1'})
          .populateAll()
          .exec(function geefGroep(err, groep){
            if(err) return cb(err);
            if(!groep) {
              err = new Error();
              err.message = require('util').format('Groep niet gevonde');
              err.status = 404;
              return cb(err);
            }
            var gebruikers = [];
            groep.deelnemers.forEach(function(gebruiker){
              gebruikers.push(_.get(gebruiker, ['id']));
            })

            var aanwezigheidslijstOBJ = {
              planning: '1',
              aanwezigen: gebruikers
            }
            Aanwezigheid.create(aanwezigheidslijstOBJ, function Created(err, lijst){
          
                if(err) return cb(err);
                lijst.save(function(err, lst){
                  if(err) return cb(err);
                });
                
            });

            async.each(gebruikers, function( gebruiker, klaar){
              var statusOBJ= {
                    aanwezigheidID: '1',
                      gebruikerID: gebruiker
                  }
              Aanwezigheidsstatus.create(statusOBJ, function Created(err, status){
                      status.save(function(err,sts){
                      if(err) return cb(err);
                      //res.json(statusOBJ);                    
                      });
                klaar(err,status);
              });

            },function(err){
               cb();
            });
          });

      }*/
    
    }

};


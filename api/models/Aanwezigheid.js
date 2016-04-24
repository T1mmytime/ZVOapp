/**
 * Aanwezigheid.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

  		aanwezigen: {
        	collection: 'user',
        	via: 'aanwezigheidslijsten',
        	dominant: true
    	},

        status: {
            collection: 'user',
            via: 'userStatus',
            dominant:true,
    		required: true,
    		defaultsTo: false
    	},

        planning: {
            collection: 'Agenda',
            via: 'aanwezigheidslijst'
        },

        createLijst: function(options,cb){

            var groep = options.groep;
                 Groep.findOne(groep.id)  
                 .exec(function(err, grp){
                    if(err) return cb(err);
                    cb(null,grp);
            });
        }
    }
};


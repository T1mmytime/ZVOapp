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
    		required: true,
    		defaultsTo: false
    	},

        planning: {
            collection: 'Agenda',
            via: 'aanwezigheidslijst'
        }

  	}
};


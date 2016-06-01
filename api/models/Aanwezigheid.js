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
        	via: 'aanwezigheidslijst',
            dominant: true
         //   through: 'useraanwezigheid'
    	},

/*status: {
            collection: 'user',
            via: 'userStatus',
            dominant:true,
    		required: true,
    		defaultsTo: false
    	},*/

        planning: {
            model: 'agenda',
            required: true
        },

        statussen: {
            collection: 'aanwezigheidsstatus',
            via: 'aanwezigheidID'
        }


    }
};


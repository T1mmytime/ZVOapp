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

  		schema: {
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
    	}

    	

    }
};


/**
 * Raport.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: { 

  	trainerID:{
  		model: 'user'
  	},

  	naam:{
  		type: 'string'
  	},
  	//examenID:{model: 'examen'},


    zwemmerID: {
      	model: 'user'
    },

    //Om te zien wanneer het examen is afgenomen 
    planningID: {
    	model: 'agenda'
    },

    resultaten:{
    	collection: 'rapportresultaten',
    	via: 'rapportID'
    },

    commentaar:{
    	type: 'string'
    }

  }
};


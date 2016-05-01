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

    zwemmerID: {
      	model: 'user'
    },

    planningID: {
    	model: 'agenda'
    }
  }
};


/**
 * Examen.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

 attributes: {

  

    beschrijving: {
    	type: 'string'
    },

    // Bexchrijving van de oefening
    oefeningen: {
    	collection: 'oefening',
    	via: 'examens',
    	dominant: true
    },

    deelnemers: {
    	collection: 'user',
    	via: 'examens',
    	dominant: true
    },

    rapporten: {
      collection: 'rapport',
      via: 'examen'
    }
  } 
};


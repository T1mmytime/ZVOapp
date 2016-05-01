/**
 * Examen.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

 attributes: {

    //Eigenlijk overbodig
    //Een examen is eigenlijk het zelfde als een training
    //Wordt ingepland en aan een groep gegeven
    //Examen controller moet gebruikt worden om een training en schema te gebruiken
    //De controller moet dan met dit schema een rapport opstellen
    //De trainer moet dan dit rapport invullen

    beschrijving: {
    	type: 'string'
    },

    // Bexchrijving van de oefening
    oefeningID: {
    	collection: 'oefening',
    	via: 'examenID',
    	dominant: true
    },



    gebruikerID: {
    	collection: 'user',
    	via: 'examenID',
    	dominant: true
    }

 /*   rapporten: {
      collection: 'rapport',
      via: 'examenID'
    }*/
  } 
};


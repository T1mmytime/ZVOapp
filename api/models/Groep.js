/**
 * Groep.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    // naam van de groep/ klas
  	naam: {
    	type: 'string',
    	required: true
    },

    // beschrijving vb leeftijd 60 +
  	beschrijving: {
    	type: 'string'
    },

    // leden die in groep horen
    deelnemers: {
    	collection: 'user',
    	via: 'groepen',
    	dominant: true
    },

    agendaPunt: {
    	collection: 'agenda',
    	via: 'groep'
    },


    getAgendaPunten: function(){
    	return this.agendaPunt;
    },

    getDeelnemers: function(){
        return this.deelnemers;
    }
  }
};


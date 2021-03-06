/**
 * Schema.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

 attributes: {

  	naam: {
  		type: 'string',
  		required: true
  	},

    bechrijving:{
      type: 'string'
    },

    auteur:{
      model: 'user',
      required: true
    },

  	oefeningID:{
      collection: 'schemaoefeningen',
      via: 'schemaID'
    },

    agendaMoment:{
      collection: 'agenda',
      via: 'schemaID'
    }

  }
};


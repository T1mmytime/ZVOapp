/**
 * Oefening.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    // naam van de oefening
    naam: {
      type: 'string',
      required: true,
      unique: true
    },

    // Bexchrijving van de oefening
    beschrijving: {
      type: 'string',
      required: true
    },

    examenID: {
      collection: 'examen',
      via: 'oefeningID'
    },

    schemaID: {
      collection: 'schemaoefeningen',
      via: 'oefeningID'
    }
  }
};



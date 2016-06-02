/**
 * SchemaOefeningen.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  		autoCreatedAt: false,
  		autoUpdatedAt: false,

  		schemaID:{
  			model: 'trainingsschema',
  			required: true
  		},

  		oefeningID:{
  			model: 'oefening',
  			required: true
  		},

  		volgorde:{
  			type: 'integer',
			required: true  			
  		},

  		tijdsduur:{
  			type: 'integer',
  			required: true
  		}
      
  }
};




/**
 * Aanwezigheidsstatus.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  		aanwezigheidID:{
  			model: 'aanwezigheid'
  		},

  		gebruikerID:{
  			model: 'user'
  		},

  		status: {
  			type: 'boolean',
  			defaultsTo: false
  		}
      
  }
};


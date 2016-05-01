/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcryptjs');

module.exports = {

 schema:true,
 	
 attributes: {
  	name:{
  		type:'string',
  		required: true
  	},
  	email:{
  		type:'string',
  		required: true,
  		email: true,
  		unique: true
  	},

    admin: {
      type: 'boolean',
      defaultsTo: false
    },

    online: {
      type: 'boolean',
      defaultsTo: false
    },

  	gencrypteerdPaswoord:{
  		type: 'string'
  	},

    rapportVan: {
      collection: 'rapport',
      via: 'zwemmerID'
    },

    rapportOpgemaakt: {
      collection: 'rapport',
      via: 'trainerID'
    },

    examenID: {
      collection: 'examen',
      via: 'gebruikerID'
    },

    aanwezigheidslijst: {
      collection: 'aanwezigheid',
      via: 'aanwezigen'
    //  through: 'useraanwezigheid'
    },

   /* userStatus: {
      collection: 'aanwezigheid',
      via: 'status',
      required: true,
      defaultsTo: false
    },*/

    //groepen tot waar het lid behoord 
    groepen: {
      collection: 'groep',
      via: 'deelnemers'
    },

    rolID: {
      collection: 'rol',
      via: 'gebruikerID'
    },

    password:{
      type: 'string',
      required: true
    },

    statussen:{
      collection: 'aanwezigheidsstatus',
      via: 'gebruikerID'
    },
    //om er voor te zorgen dat niet alles terug gegeven wordt aan de client


 /* beforeValidation: function(values, next){
   // console.log(values)
    if(typeof values.admin !=='undefined'){
      if(values.admin == 'unchecked'){
        values.admin = false;
      } else if (values.admin[1] == 'on'){
        values.admin = true;
      }
    }
    next();
  },
*/
  isPasswordValid: function (password, cb) {
      bcrypt.compare(password, this.password, cb);
  },
 /* beforeCreate: function (values, next){
    if(!values.paswoord || values.paswoord != values.pasBevestiging){
      return next({err: ["Paswoord is niet gelijk aan het bevestigings paswoord " + values.paswoord + " " + values.pasBevestiging] });
    }

    require('bcryptjs').hash(values.paswoord, 10, function paswoordEncrypteren(err, gencrypteerdPaswoord){
      if(err) return next(err);
      values.gencrypteerdPaswoord = gencrypteerdPaswoord;
      //values.online = true;
      next();
    });
  },*/

  isTrainer: function(){
     var i =0;
     for (; i < this.rolID.length; i++) {
          if (this.rolID[i].naam === 'trainer') {
              return true;
          }
      }
      return false;
  }, 

  getRollen: function(){
      return this.rolID;
  },

  isRedder: function(){
     var i =0;
     for (; i < this.rolID.length; i++) {
          if (this.rolID[i].naam === 'redder') {
              return true;
          }
      }
      return false;
  },

  isAdmin: function(){
     var i =0;
     for (; i < this.rolID.length; i++) {
          if (this.rolID[i].naam === 'admin') {
              return true;
          }
      }
      return false;
  },

  isZwemmer: function(){
     var i =0;
     for (; i < this.rolID.length; i++) {
          if (this.rolID[i].naam === 'zemmer') {
              return true;
          }
      }
      return false;
  },


  toJSON: function(){
      var obj = this.toObject();

      delete obj.paswoord;
      delete obj.password;
      delete obj.pasBevestiging;
      delete obj.gencrypteerdPaswoord;
      delete obj._csrf;
      return obj;
    }
  }

};


/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

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

    rapporten: {
      collection: 'rapport',
      via: 'zwemmer'
    },

    examens: {
      collection: 'examen',
      via: 'deelnemers'
    },

    aanwezigheidslijsten: {
      collection: 'aanwezigheid',
      via: 'aanwezigen'
    },

    //groepen tot waar het lid behoord 
    groepen: {
      collection: 'groep',
      via: 'deelnemers'
    },

    rollen: {
      collection: 'rol',
      via: 'gebruikers'
    },

    //om er voor te zorgen dat niet alles terug gegeven wordt aan de client


  beforeValidation: function(values, next){
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

  beforeCreate: function (values, next){
    if(!values.paswoord || values.paswoord != values.pasBevestiging){
      return next({err: ["Paswoord is niet gelijk aan het bevestigings paswoord " + values.paswoord + " " + values.pasBevestiging] });
    }

    require('bcryptjs').hash(values.paswoord, 10, function paswoordEncrypteren(err, gencrypteerdPaswoord){
      if(err) return next(err);
      values.gencrypteerdPaswoord = gencrypteerdPaswoord;
      //values.online = true;
      next();
    });
  },

  /*isTrainer: function(gebruiker, cb){
        User.findone(gebruiker.id).exec(function( err, deGebruiker){
          if (err) return cb(err);
          if (!deGebruiker) return cb(new Error('gebruiker niet gevonden'));
          if (gebruiker.rollen.naam != 'trainer') return cb( new Error('gebruiker is geen trainer'));
          return true;
        })
  },*/
  isTrainer: function(){
     var i =0;
     for (; i < this.rollen.length; i++) {
          if (this.rollen[i].naam === 'trainer') {
              return true;
          }
      }
      return false;
  }, 
  /*isTrainer: function(){
          this.rollen.findOne(naam:'trainer').exec(function(err){
              if (err) return err;
              return true;
      })
  },*/
  getRollen: function(){
      return this.rollen;
  },

  isRedder: function(){
     var i =0;
     for (; i < this.rollen.length; i++) {
          if (this.rollen[i].naam === 'redder') {
              return true;
          }
      }
      return false;
  },

  isAdmin: function(){
     var i =0;
     for (; i < this.rollen.length; i++) {
          if (this.rollen[i].naam === 'admin') {
              return true;
          }
      }
      return false;
  },

  toJSON: function(){
      var obj = this.toObject();

      delete obj.paswoord;
      delete obj.pasBevestiging;
      delete obj.gencrypteerdPaswoord;
      delete obj._csrf;
      return obj;
    }
  }

};


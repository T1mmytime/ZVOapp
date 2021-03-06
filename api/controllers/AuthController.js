/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 * @source      :: https://github.com/saviogl/sails-hook-jwt-auth/blob/master/api/controllers/AuthController.js
 */

var bcrypt = require('bcryptjs');
var helper = require('../../lib/helper.js');
var jwt = require('jsonwebtoken');

module.exports = {

   //Indien login succesvol is, geef json met User object en token
  login: function (req, res) {
    // Validate request paramaters
    if ( !req.body.email || !req.body.password ) {
      return res.json( 400, { err: {
        status: 'danger',
        message: res.i18n('auth.login.badRequest')
      }});
    }

    User.findOneByEmail( req.body.email, function(err, user) {
      if ( err ) {
        res.json( 500, { err: err } );
      }

      if ( !user ) {
        return res.json( 401, { err: {
          status: 'warn',
          message: res.i18n('auth.login.noUserFound')
        }});
      }

      user.isPasswordValid( req.body.password, function (err, bool) {
        if ( err ) return res.serverError(err);
        if ( bool ) {
          user.online = true;
          return res.json( { user: user, token: TokenAuth.issueToken({ sub: user.id }) } );
        } else {
          return res.json( 401, { err: {
            status: 'danger',
            message: res.i18n('auth.login.invalidPassword')
          }});
        }
      });
    });

  },

  signup: function (req, res) {
    // Validate request paramaters
    if ( !req.body.email || !req.body.password || !req.body.confirmPassword ) {
      return res.json( 400, { err: {
        status: 'danger',
        message: res.i18n('auth.signup.badRequest')
      }});
    }

    //TODO: Do some validation on the input
    if ( req.body.password !== req.body.confirmPassword ) {
      return res.json( 400, { err: {
        status: 'danger',
        message: res.i18n('auth.signup.passwordsNoMatch')
      }});
    }

    var newUser = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.naam
    };
    //account activatie niet gebruiken
/*
    if ( jwt.requireAccountActivation ) {
      if ( !jwt.sendAccountActivationEmail ) {
        sails.log.error('sails-hook-jwt:: An email function must be implemented through `sails.config.jwt.sendAccountActivationEmail` in order to enable the account activation feature. This will receive two parameters (user, activationLink).');
        return res.json(500);
      }

      newUser.online = false;
    }
*/
    // Encrypt password before saving to database
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newUser.password, salt, function(err, hash) {
        if ( err ){
          return res.json(500, { err: err });
        }

        newUser.password = hash;

        User.create(newUser).exec(function(err, user) {
          if ( err ) {
            if ( err.ValidationError ) {
              return helper.convertWaterlineError(err, res);
            }

            return res.json( err.status, { err: err } );
          }

        //  if ( user.online ) {
          user.online = true;
          return res.json( { user: user, token: TokenAuth.issueToken({ sub: user.id }) } );
       //   }

//          return sails.config.jwt.sendAccountActivationEmail(res, user, helper.createActivationLink( user ));
        });
      });
    });
  },

/* activate: function (req, res){
    var token = req.param('token');
    TokenAuth.verifyToken(token, function (err, decodedToken){
      if ( err ) {
        return res.json( 401, { err: { status: 'danger', message: res.i18n('auth.policy.invalidToken'), detail: err }});
      }

      User.findOneById(decodedToken.sub)
      .exec(function (err, user){
        if ( err ) {
          sails.log.debug('AuthController:: Error - finding user to activate');
          sails.log.debug('AuthController:: Error - Decoded token: ', decodedToken);
          sails.log.debug('AuthController:: Error - Object: ', err);
          return res.json(500, err);
        }

        if ( !user ) {
          sails.log.warn('AuthController:: Warn - No user found with this token payload');
          sails.log.warn('AuthController:: Warn - Decoded token: ', decodedToken);
          return res.json( 404, { err: {
            status: 'warn',
            message: res.i18n('auth.activate.noUserFound')
          }});
        }

        user.online = true;
        user.save(function (err, savedUser){
          if ( err ) {
            sails.log.debug('AuthController:: Error - Updating user');
            sails.log.debug('AuthController:: Error - Object: ', err);
            return res.json( 500, err );
          }

          return res.json( 200, { message: 'Account updated successfully!' } );

        });

      });
    });
  }*/
};


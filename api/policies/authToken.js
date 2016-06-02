//Source https://github.com/saviogl/sails-hook-jwt-auth


module.exports = function(req, res, next) {
  var token;
  //kijkt na of de header aanwezig is en de token aanwezig is in de header
  if ( req.headers && req.headers.authorization ) {
    var parts = req.headers.authorization.split(' ');
    if ( parts.length == 2 ) {
      var scheme = parts[0],
        credentials = parts[1];

      if ( /^Bearer$/i.test(scheme) ) {
        token = credentials;
      }
    } else {
      return res.json( 401, { err: { status: 'danger', message: res.i18n('auth.policy.wrongFormat') }});
    }
  } //of geef de token gewoon mee als parameter 
  else if ( req.param('token') ) {
    token = req.param('token');
    // We delete the token from param to not mess with blueprints
    delete req.query.token;
  } else {
    return res.json( 401, { err: { status: 'danger', message: res.i18n('auth.policy.noAuthorizationHeaderFound') }});
  }

  //kijk of de opgegeven token geldig is 
  TokenAuth.verifyToken(token, function(err, decodedToken) {
    if ( err ) return res.json( 401, { err: { status: 'danger', message: res.i18n('auth.policy.invalidToken'), detail: err }});

    req.token = decodedToken.sub;

    next();
  });
};
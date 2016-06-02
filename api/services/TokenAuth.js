var jwt = require('jsonwebtoken');

module.exports.issueToken = function(payload, options) {
  var token = jwt.sign(payload, process.env.TOKEN_SECRET || "secret zin", options);
  return token;   // jwt.token_secret
};

module.exports.verifyToken = function(token, callback) {
  return jwt.verify(token, process.env.TOKEN_SECRET || "secret zin", {}, callback);
};
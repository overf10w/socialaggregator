var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var keys = require('../../keyManager');

module.exports = function () {
  passport.use(new GoogleStrategy({
    clientID: keys.GoogleCredentials.clientID,
    clientSecret: keys.GoogleCredentials.clientSecret,
    callbackURL: keys.GoogleCredentials.callbackURL
  },
    function (req, accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  ));
}
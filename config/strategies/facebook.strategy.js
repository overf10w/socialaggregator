var passport = require('passport'),
    FacebookStrategy = require('passport-facebook'),
    keys = require('../../keyManager');

module.exports = function () {
  passport.use(new FacebookStrategy({
    clientID: keys.FacebookCredentials.appID,
    clientSecret: keys.FacebookCredentials.appSecret,
    callbackURL: keys.FacebookCredentials.callbackURL,
    passReqToCallback: true,
    profileFields: ['id', 'emails', 'name', 'displayName']
  },
  function (req, accessToken, refreshToken, profile, done) {
    var user = {};
    
    user.email = profile.emails[0].value;
    // user.image = profile._json.image.url;
    user.displayName = profile.displayName;

    user.facebook = {};
    user.facebook.id = profile.id;
    user.facebook.token = accessToken;

  }));
};

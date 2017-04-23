var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var keys = require('../../keyManager');
var User = require('../../models/userModel');

module.exports = function () {
  passport.use(new GoogleStrategy({
    clientID: keys.GoogleCredentials.clientID,
    clientSecret: keys.GoogleCredentials.clientSecret,
    callbackURL: keys.GoogleCredentials.callbackURL
  },
  function (req, accessToken, refreshToken, profile, done) {
    var user = {};
    var query = {
      'google.id': profile.id
    };
    User.findOne(query, function (err, user) {
      if (user) {
        console.log('found');
        done(null, user);
      } else {
        console.log('not found!');
        var user = new User();
        user.email = profile.emails[0].value;
        user.image = profile._json.image.url;
        user.displayName = profile.displayName;

        user.google = {};
        user.google.id = profile.id;
        user.google.token = accessToken;

        user.save();
        done(null, user);
      }
    });
  }));
};

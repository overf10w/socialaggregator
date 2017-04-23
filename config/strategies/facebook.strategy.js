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
    var query = {
      'facebook.id': profile.id
    };
    User.findOne(query, function (err, user) {
      if (user) {
        console.log('found');
        done(null, user);
      } else {
        console.log('not found!');
        var user = new User();
        user.email = profile.emails[0].value;
        // user.image = profile._json.image.url; // fb doesn't provide image
        user.displayName = profile.displayName;

        user.facebook = {};
        user.facebook.id = profile.id;
        user.facebook.token = accessToken;

        user.save();
        done(null, user);
      }
    });
  }));
};

var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var keys = require('../../keyManager');

module.exports = function() {
  passport.use(new TwitterStrategy({
    consumerKey: keys.TwitterCredentials.consumerKey,
    consumerSecret: keys.TwitterCredentials.consumerSecret,
    callbackURL: keys.TwitterCredentials.callbackURL,
    passReqToCallback: true
  },
  function(req, token, tokenSecret, profile, done) {
    var user = {};
    user.image = profile._json.profile_image_url;
    user.displayName = profile.displayName;

    user.twitter = {};
    user.twitter.id = profile.id;
    user.twitter.token = profile.accessToken;

    done(null, user);
  }));
};

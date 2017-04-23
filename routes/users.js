var express = require('express');
var router = express.Router();

// MW
router.use('/', function(req, res, next) {
  if (!req.user) {
    res.redirect('/');
  }
  next();
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  // user is added to req by Passport
  res.render('users', { user: { name: req.user.displayName,
                                image: req.user._json.image.url } });
});

module.exports = router;

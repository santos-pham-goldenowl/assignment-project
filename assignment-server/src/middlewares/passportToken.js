const passport = require('passport');
const BearerStrategy = require('passport-http-bearer');

passport.use(new BearerStrategy(
  // function(consumerKey, done) {
  //   console.log('run to comsuserKey');
  //   Consumer.findOne({ key: consumerKey }, function (err, consumer) {
  //     if (err) { return done(err); }
  //     if (!consumer) { return done(null, false); }
  //     return done(null, consumer, consumer.secret);
  //   });
  // },
  // function(accessToken, done) {
  //   console.log('accessToken: ', accessToken);
  //   AccessToken.findOne({ token: accessToken }, function (err, token) {
  //     if (err) { return done(err); }
  //     if (!token) { return done(null, false); }
  //     Users.findById(token.userId, function(err, user) {
  //       if (err) { return done(err); }
  //       if (!user) { return done(null, false); }
  //       // fourth argument is optional info.  typically used to pass
  //       // details needed to authorize the request (ex: `scope`)
  //       return done(null, user, token.secret, { scope: token.scope });
  //     });
  //   });
  // },
  // function(timestamp, nonce, done) {
  //   console.log('come here????');
  //   // validate the timestamp and nonce as necessary
  //   done(null, true)
  // }
  function(token, done) {
    console.log('token: ', token);
    // User.findOne({ token: token }, function (err, user) {
    //   if (err) { return done(err); }
    //   if (!user) { return done(null, false); }
    //   return done(null, user, { scope: 'read' });
    // });
  }
));

const passport = require('passport');
const VKontakteStrategy = require('passport-vkontakte').Strategy;

passport.use(new VKontakteStrategy({
  clientID: 6459924, // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
  clientSecret: 'u7g1K8RMnc45YZMMvWDP',
  callbackURL: 'http://localhost:3000/api/auth/vkontakte/callback',
}, (accessToken, refreshToken, params, profile, done) => {
  // console.log(params.email); // getting the email 
  // User.findOrCreate({ vkontakteId: profile.id }, function (err, user) {
  //   return done(err, user);
  // });
  console.log('DOOOOOOONNEEEEE!');
  console.log(accessToken);
  console.log(profile);
  done(null, { test: true });
}));

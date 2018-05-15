const passport = require('passport');
const VKontakteStrategy = require('passport-vkontakte').Strategy;
const { findOrCreate } = require('../models/user-helper');

passport.use(new VKontakteStrategy({
  clientID: 6459924, // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
  clientSecret: 'u7g1K8RMnc45YZMMvWDP',
  callbackURL: 'http://localhost:3000/api/auth/vkontakte/callback',
}, (accessToken, refreshToken, params, profile, done) => {
  findOrCreate(profile, (err, user) => done(err, { user, accessToken, refreshToken }));
}));

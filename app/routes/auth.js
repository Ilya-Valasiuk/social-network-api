const express = require('express');
const passport = require('passport');

const router = express.Router();

const AuthRouter = () => {
  router.get(
    '/vkontakte',
    passport.authenticate('vkontakte'),
    (req, res) => {
      // The request will be redirected to vk.com for authentication, so
      // this function will not be called.
    });

  router.get(
    '/vkontakte/callback',
    passport.authenticate('vkontakte', { successRedirect: '/', failureRedirect: '/logintest' }),
    (req, res) => {
      // Successful authentication, redirect home.
      res.redirect('/');
    });

  return router;
};

module.exports = AuthRouter;

const express = require('express');
const passport = require('passport');

const router = express.Router();

const AuthRouter = () => {
  router.get(
    '/vkontakte',
    passport.authenticate('vkontakte'),
    (req, res) => { //eslint-disable-line
      // The request will be redirected to vk.com for authentication, so
      // this function will not be called.
    }); //eslint-disable-line

  router.get(
    '/vkontakte/callback',
    passport.authenticate('vkontakte', { successRedirect: '/api', failureRedirect: '/logintest' }),
    (req, res) => {
      // Successful authentication, redirect home.
      res.redirect('/');
    }); //eslint-disable-line

  return router;
};

module.exports = AuthRouter;

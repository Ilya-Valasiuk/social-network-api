const express = require('express');
const passport = require('passport');

const router = express.Router();

const UI_URL_PREFIX = process.env.NODE_ENV === 'production' ? 'https://social-network-ui.herokuapp.com' : 'http://localhost:3001';

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
    passport.authenticate('vkontakte'),
    (req, res) => {
      const { user = {} } = req.user || {};
      // Successful authentication, redirect home.
      // res.redirect(`${UI_URL_PREFIX}/main?token=${accessToken}`);
      res.redirect(`${UI_URL_PREFIX}/main?userId=${user.id}`);
    }); //eslint-disable-line

  return router;
};

module.exports = AuthRouter;

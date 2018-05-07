const express = require('express');
const AuthRouter = require('./auth');
const InterestsRouter = require('./interests');
const UserRouter = require('./user');

const router = express.Router();

const APIRouter = () => {
  router.use('/auth', AuthRouter());
  router.use('/', InterestsRouter());
  router.use('/', UserRouter());

  router.get('/', (req, res) => {
    res.json({ susses: true, message: 'You are rock!' });
  });

  return router;
};

module.exports = APIRouter;

const express = require('express');
const AuthRouter = require('./auth');
// const UserAPI = require('./user');

const router = express.Router();

const APIRouter = () => {
  router.use('/auth', AuthRouter());

  router.get('/', (req, res) => {
    res.json({ susses: true, message: 'You are rock!' });
  });

  // router.use('/user', UserAPI());

  return router;
};

module.exports = APIRouter;

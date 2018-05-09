const express = require('express');
const {
  updateUserWithInterets,
  updateUserWithPosition,
  updateUserWithNotification,
  getUsers,
  findUser,
  getBestMatchedUsers,
} = require('./../models/user-helper');

const router = express.Router();

/**
 * GET http://localhost:3000/api/users
 * GET http://localhost:3000/api/user/[id]
 * POST http://localhost:3000/api/user/382059684/interests
 * {
 *  "interests": ["5aeb4cea77ec838cd45884bf"]
 * }
 */
const UserRouter = () => {
  router.put(
    '/user/:id/interests',
    (req, res) => {
      const { interests } = req.body;
      const { id } = req.params;
      updateUserWithInterets({ userId: id, interests })
        .then(({ user }) => {
          res.json({ user });
        })
        .catch((err) => {
          res.json({ errro: true, message: err });
        });
    }); // eslint-disable-line

  router.put(
    '/user/:id/position',
    (req, res) => {
      const { position } = req.body;
      const { id } = req.params;
      updateUserWithPosition({ userId: id, position })
        .then(({ user }) => {
          res.json({ user });
        })
        .catch((err) => {
          res.json({ errro: true, message: err });
        });
    }); // eslint-disable-line

  router.put(
    '/user/:id/notification',
    (req, res) => {
      const { notification } = req.body;
      const { id } = req.params;
      updateUserWithNotification({ userId: id, notification })
        .then(({ user }) => {
          res.json({ user });
        })
        .catch((err) => {
          res.json({ errro: true, message: err });
        });
    }); // eslint-disable-line

  router.get(
    '/user/:id',
    (req, res) => {
      const { id } = req.params;

      findUser({ id })
        .then((user) => {
          if (!user) {
            res.json({
              error: true,
              message: 'User was not found',
            });
          } else {
            res.json(user);
          }
        })
        .catch(err => res.json(err));
    }); // eslint-disable-line

  router.get(
    '/user/:id/users',
    (req, res) => {
      const { id } = req.params;

      findUser({ id })
        .then((user) => {
          if (!user) {
            res.json({
              error: true,
              message: 'User was not found',
            });
          } else {
            // get find users logic
            getBestMatchedUsers(user)
              .then(({ users }) => {
                res.json({ user, users });
              })
              .catch(err => res.json({ error: true, message: err }));
          }
        })
        .catch(err => res.json(err));
    }); // eslint-disable-line

  router.get(
    '/users',
    (req, res) => {
      getUsers()
        .then(({ users }) => {
          res.json({ users });
        })
        .catch(err => res.json({ error: true, message: err }));
    }); // eslint-disable-line

  return router;
};

module.exports = UserRouter;

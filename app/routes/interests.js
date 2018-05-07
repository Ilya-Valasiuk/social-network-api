const express = require('express');
const Interests = require('./../models/Interests');

const router = express.Router();

/**
 * GET http://localhost:3000/api/interests
 * POST http://localhost:3000/api/interests
 * {
 *   "title": "BMW",
 *   "category": "cars"
 * }
 */

const InterestsRouter = () => {
  router.post(
    '/interests',
    (req, res) => {
      const { title, category } = req.body;
      const interest = new Interests({ title, category });

      interest.save((err) => {
        if (err) {
          console.log('Interests save error ', err);
          return res.json({ error: true, message: err });
        }
        return res.json({ results: interest });
      });
    }); // eslint-disable-line

  router.get(
    '/interests',
    (req, res) => {
      Interests.find((err, interests) => {
        if (err) {
          return res.json({ error: true, message: err });
        }
        return res.json({ result: interests });
      });
    }); // eslint-disable-line

  return router;
};

module.exports = InterestsRouter;

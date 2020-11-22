const express = require('express');
const {isInteger} = require('lodash');
const bikeService = require('../services/BikeService');

const initBikeRouting = (app) => {
  const bikeRouter = express.Router();

  app.use('/bike', bikeRouter);

  //add error handling
  bikeRouter.get('/:userId/', (req, res) => {
    var userId = parseInt(req.params.userId, 10);
    if (isInteger(userId)) {
      bikeService
        .GetBikesForUser(userId)
        .then((bikes) => {
          res.status(200).send(JSON.stringify(bikes));
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send(err);
        });
    } else {
      res.post;
      status(400).send('Improper user parameter');
    }
  });
};

module.exports = initBikeRouting;

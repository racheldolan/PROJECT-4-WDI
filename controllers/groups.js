const Group = require('../models/group');

function indexRoute(req, res, next) {
  Group
    .find()
    .then(groups => res.json(groups))
    .catch(next);
}

function showRoute(req, res, next) {
  Group
    .findById(req.params.id)
    .then(group => res.json(group))
    .catch(next);
}

function createRoute(req, res, next){
  Group
    .create(req.body)
    .then(group => res.status(201).json(group))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute
};

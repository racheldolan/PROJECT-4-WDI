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
    .populate('members')
    .then(group => res.json(group))
    .catch(next);
}

function createRoute(req, res, next) {
  Group
    .create(req.body)
    .then(group => res.status(201).json(group))
    .catch(next);
}

function updateRoute(req, res, next) {
  Group
    .findById(req.params.id)
    .then(group => group.set(req.body))
    .then(group => group.save())
    .then(group => res.json(group))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Group
    .findById(req.params.id)
    .then(group => group.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

function addToUserRoute(req, res, next) {
  // console.log(req.body);
  Group
    .findById(req.params.id)
    .then(group => {
      group.members.push(req.body);
      group.save();
    })
    .then(group => res.json(group))
    .catch(next);
}

function deleteFromUserRoute(req, res, next) {
  Group.findById(req.params.id)
    .then(group => {
      group.members = req.body.members;
      group.save();
    })
    .then(group => res.json(group))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute,
  addToUser: addToUserRoute,
  deleteFromUser: deleteFromUserRoute
};

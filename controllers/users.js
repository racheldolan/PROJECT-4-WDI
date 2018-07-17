const User = require('../models/user');


function showRoute(req, res, next){
  User
    .findById(req.params.id)
    .populate('groups')
    .populate('groupsCreated')
    .then(user => res.json(user))
    .catch(next);
}

function updateRoute(req, res, next) {
  User.findById(req.params.id)
    .then(user => Object.assign(user, req.body))
    .then(user => user.save())
    .then(user => res.json(user))
    .catch(next);
}

function deleteRoute(req, res, next) {
  User
    .findById(req.params.id)
    .then(user => user.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute
};

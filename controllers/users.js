const User = require('../models/user');


function showRoute(req, res, next){
  User
    .findById(req.params.id)
    .populate('groups')
    .then(user => res.json(user))
    .catch(next);
}

// function profileRoute(req, res, next) {
//   console.log(req.body);
//   // req.body = req.currentUser;
//   User
//     .findById(req.params.id)
//     .populate('groups')
//     .then(currentUser => res.json(currentUser))
//     .catch(next);
// }

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

function addToGroupRoute(req, res, next) {
  User.populate(req.currentUser._id, { path: 'groups' })
    .then(user => res.json(user))
    .catch(next);
}

// function groupsCreated(req, res, next) {
//   User.populate(req.currentUser._id, { path: 'groupsCreated' })
//     .then(user => res.json(user))
//     .catch(next);
// }

module.exports = {
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute,
  addToGroup: addToGroupRoute
  // profile: profileRoute
};

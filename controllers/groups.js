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
    .populate('comments.author')
    .populate('comments.content')
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

function addUserRoute(req, res, next) {
  Group
    .findById(req.params.id)
    .then(group => {
      group.members.push(req.currentUser);
      group.save();
    })
    .then(group => res.json(group))
    .catch(next);
}

function removeUserRoute(req, res, next) {
  Group.findById(req.params.id)
    .then(group => {
      const index = group.members.indexOf(req.currentUser._id);
      group.members.splice(index, 1);
      group.save();
    })
    .then(group => res.json(group))
    .catch(next);
}

function commentCreateRoute(req, res, next) {
  // console.log(req.body);
  req.body.author = req.currentUser;
  Group
    .findById(req.params.id)
    .populate('comments.author')
    // .populate('comments.content')
    .then(group => {
      group.comments.push(req.body);
      return group.save();
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
  addUser: addUserRoute,
  removeUser: removeUserRoute,
  commentCreate: commentCreateRoute
};

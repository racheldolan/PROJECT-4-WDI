const User = require('./models/user');

function showRoute(req, res, next){
  User
    .findById(req.params.id)
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


module.exports = {
  show: showRoute,
  update: updateRoute
};

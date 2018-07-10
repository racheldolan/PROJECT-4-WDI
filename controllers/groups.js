const Group = require('../models/group');

function indexRoute(req, res, next) {
  Group
    .find()
    .then(groups => res.json(groups))
    .catch(next);
}

module.exports = {
  index: indexRoute
};

const router = require('express').Router();
const googleVision = require('../controllers/googleVision');
const auth = require('../controllers/auth');
const users = require('../controllers/users');
const groups = require('../controllers/groups');
const secureRoute = require('../lib/secureRoute');

router.post('/', googleVision.getPhotoAnalysis);

router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

router.put('/users/:id/groups', secureRoute, users.addToGroup);

router.route('/groups')
  .get(groups.index)
  .post(secureRoute, groups.create);

router.route('/groups/:id')
  .get(groups.show)
  .put(groups.update)
  .delete(groups.delete);

router.post('/login', auth.login);

router.post('/register', auth.register);

module.exports = router;

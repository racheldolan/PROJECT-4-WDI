const router = require('express').Router();
const googleVision = require('../controllers/googleVision');
const auth = require('../controllers/auth');
const users = require('../controllers/users');
const groups = require('../controllers/groups');

router.post('/', googleVision.getPhotoAnalysis);

router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

router.route('/groups')
  .get(groups.index)
  .post(groups.create);

router.route('/groups/:id')
  .get(groups.show)
  .put(groups.update)
  .delete(groups.delete);

router.post('/login', auth.login);

router.post('/register', auth.register);

module.exports = router;

const router = require('express').Router();
const googleVision = require('../controllers/googleVision');
const auth = require('../controllers/auth');
const users = require('../controllers/users');
const groups = require('../controllers/groups');
const secureRoute = require('../lib/secureRoute');

router.post('/vision', googleVision.getPhotoAnalysis);

router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

router.route('/profile')
  .get(users.profile);

router.post('/groups/:id/members', secureRoute, groups.addUser);
router.delete('/groups/:id/members', secureRoute, groups.removeUser);

router.post('/groups/:id/comments', secureRoute, groups.commentCreate);

router.route('/groups')
  .get(groups.index)
  .post(secureRoute, groups.create);

router.route('/groups/:id')
  .get(groups.show)
  .put(secureRoute, groups.update)
  .delete(secureRoute, groups.delete);

router.post('/login', auth.login);

router.post('/register', auth.register);

module.exports = router;

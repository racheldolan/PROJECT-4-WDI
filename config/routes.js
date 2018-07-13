const router = require('express').Router();
const googleVision = require('../controllers/googleVision');
const auth = require('../controllers/auth');
const users = require('../controllers/users');
const groups = require('../controllers/groups');
const books = require('../controllers/books');
const secureRoute = require('../lib/secureRoute');

router.post('/vision', googleVision.getPhotoAnalysis);

router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

router.put('/users/:id/groups', secureRoute, users.addToGroup);
router.put('/groups/:id/users', secureRoute, groups.addToUser);
router.put('/groups/:id/users/delete', groups.deleteFromUser);

router.route('/groups')
  .get(groups.index)
  .post(secureRoute, groups.create);

router.route('/groups/:id')
  .get(groups.show)
  .put(secureRoute, groups.update)
  .delete(secureRoute, groups.delete);

router.post('/groups/:id/books', books.create); 

router.post('/login', auth.login);

router.post('/register', auth.register);

module.exports = router;

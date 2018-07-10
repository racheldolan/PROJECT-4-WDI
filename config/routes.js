const router = require('express').Router();
const googleVision = require('../controllers/googleVision');
const auth = require('../controllers/auth');
const users = require('../controllers/users');

router.post('/', googleVision.getPhotoAnalysis);

router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

router.post('/login', auth.login);

router.post('/register', auth.register);

module.exports = router;

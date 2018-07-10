const router = require('express').Router();
const googleVision = require('../controllers/googleVision');
const auth = require('../controllers/auth');
const users = require('../controllers/users');

router.post('/', googleVision.getPhotoAnalysis);

router.get('/user/:id', users.show);

router.put('/user/:id/edit', users.update);

router.post('/login', auth.login);

router.post('/register', auth.register);

module.exports = router;

const router = require('express').Router();
const googleVision = require('../controllers/googleVision');
const auth = require('../controllers/auth');

router.post('/', googleVision.getPhotoAnalysis);

router.post('/login', auth.login);

router.post('/register', auth.register);

module.exports = router;

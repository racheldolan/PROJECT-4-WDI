const router = require('express').Router();
const googleVision = require('../controllers/googleVision');

router.post('/', googleVision.getPhotoAnalysis);

module.exports = router;

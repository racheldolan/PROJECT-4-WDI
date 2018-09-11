const { googleKey } = require('../config/environment');
const rp = require('request-promise');

function getPhotoAnalysis(req, res, next) {
  const request = {
    requests: [
      {
        image: { content: req.body.image.replace(/^data:image\/.+;base64,/, '') },
        features: [{ type: 'WEB_DETECTION' }]
      }
    ]
  };

  rp({
    method: 'POST',
    url: `https://vision.googleapis.com/v1/images:annotate?key=${googleKey}`,
    body: request,
    json: true
  })
    // .then(response => res.json(response.responses[0].webDetection.pagesWithMatchingImages))
    .then(response => res.json(response.responses[0].webDetection.visuallySimilarImages))
    .catch(next);
}

module.exports = {
  getPhotoAnalysis
};

const { googleKey } = require('../config/environment');
const rp = require('request-promise');

function getPhotoAnalysis(req, res, next) {
  console.log(req.body.image);
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
    // .then(response => console.log(res.json(response)))
    .then(response => res.json(response.responses[0].webDetection.visuallySimilarImages))
    // .then(response => res.json(response.responses[0].webDetection.pagesWithMatchingImages))
    .catch(next);
}

module.exports = {
  getPhotoAnalysis
};

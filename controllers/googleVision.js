// Imports the Google Cloud client library
// const vision = require('@google-cloud/vision');

const { googleKey } = require('../config/environment');
const rp = require('request-promise');
const image = require('./googleVision');

function getPhotoAnalysis(req, res, next) {

  const request = {
    "requests": [
      {
        "image": {
          "content": image },
        "features": [
          {
            "type": "TEXT_DETECTION"
          }
        ]
      }
    ]
  };

  rp({
    method: 'POST',
    url: `https://vision.googleapis.com/v1/images:annotate?key=${googleKey}`,
    // data: JSON.stringify(request),
    json: true
  })
    .then(response => res.json(response))
    .catch(next);


}

module.exports = {
  getPhotoAnalysis
};

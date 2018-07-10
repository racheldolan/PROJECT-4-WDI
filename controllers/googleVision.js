// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');
const gcloud = require('gcloud');
const { bucket } = require('./config/environment');
// Creates a client
const client = new vision.ImageAnnotatorClient();

// Performs label detection on the image file
client
  .labelDetection('')
  .then(results => {
    const labels = results[0].labelAnnotations;

    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

const port = 4000;
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/project-4-wdi';
const googleKey = process.env.GOOGLE_VISION_API_KEY;
const bucket = process.env.GCLOUD_STORAGE_BUCKET;

module.exports = { port, dbURI, googleKey, bucket };

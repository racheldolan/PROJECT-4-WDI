const port = 4000;
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/project-4-wdi';

module.exports = { port, dbURI };

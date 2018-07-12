const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bodyParser = require('body-parser');
const { port, dbURI } = require('./config/environment');
const errorHandler = require('./lib/errorHandler');

mongoose.connect(dbURI);

const routes = require('./config/routes');

app.use(bodyParser.json({
  limit: '1000kb'
}));

app.use('/api', routes);

app.use(express.static(`${__dirname}/public`));

app.use(errorHandler);

// app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.listen(port, () => console.log(`Express running on port ${port}`));

module.exports = app;

const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bodyParser = require('body-parser');
const { port, dbURI } = require('./config/environment');
const errorHandler = require('./lib/errorHandler');
const routes = require('./config/routes');

mongoose.connect(dbURI);
app.use(express.static(`${__dirname}/public`));


app.use(bodyParser.json({
  limit: '1000kb'
}));
app.use('/api', routes);
app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.use(errorHandler);

app.listen(port, () => console.log(`Express running on port ${port}`));

module.exports = app;

const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bodyParser = require('body-parser');
const { port, dbURI } = require('./config/environment');

mongoose.connect(dbURI);

const routes = require('./config/routes');

app.use(bodyParser.json());

app.use('/api', routes);

app.use(express.static(`${__dirname}/public`));



// app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.listen(port, () => console.log(`Express running on port ${port}`));

module.exports = app;

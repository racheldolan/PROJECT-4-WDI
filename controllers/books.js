const Book = require('../models/book');

function indexRoute(req, res, next) {
  Book
    .find()
    .then(books => res.json(books))
    .catch(next);
}

function createRoute(req, res, next) {
  Book
    .create(req.body)
    .then(book => res.status(201).json(book))
    .catch(next);
}

function updateRoute(req, res, next) {
  Book
    .findById(req.params.id)
    .then(book => book.set(req.body))
    .then(book => book.save())
    .then(book => res.json(book))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Book
    .findById(req.params.id)
    .then(book => book.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute
};

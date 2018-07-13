const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  image: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Book', bookSchema);

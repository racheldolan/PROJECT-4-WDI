const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, default: 'http://scholastic.ugc.bazaarvoice.com/stories/7695-en_us/static/photoPlaceholder.gif'},
  about: { type: String, default: 'Add some info about your group!'},
  members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  currentBook: { type: String },
  previousBooks: [{ type: String }]
});

module.exports = mongoose.model('Group', groupSchema);
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  image: String,
  url: String
});

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

const groupSchema = new mongoose.Schema({
  groupName: { type: String, required: 'this field is required' },
  image: { type: String, default: 'http://scholastic.ugc.bazaarvoice.com/stories/7695-en_us/static/photoPlaceholder.gif'},
  info: { type: String, default: 'Add some info about your group!'},
  public: { type: String },
  members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  // currentBook: { type: String },
  books: [ bookSchema ],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [ commentSchema ]
});

module.exports = mongoose.model('Group', groupSchema);

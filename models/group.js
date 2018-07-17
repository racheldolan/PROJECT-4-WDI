const mongoose = require('mongoose');
// const moment = require('moment');

const bookSchema = new mongoose.Schema({
  image: String,
  url: String,
  startDate: { type: Date },
  endDate: { type: Date }
});

const commentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.ObjectId, ref: 'User' },
  content: { type: String, required: true }
});

const groupSchema = new mongoose.Schema({
  groupName: { type: String, required: 'this field is required' },
  image: { type: String, default: 'http://scholastic.ugc.bazaarvoice.com/stories/7695-en_us/static/photoPlaceholder.gif'},
  info: { type: String, default: 'Add some info about your group!'},
  public: { type: String },
  members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  books: [ bookSchema ],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [ commentSchema ],
  location: String
});

// bookSchema.path('startDate')
//   .get(function formatDate(startDate){
//     return moment(startDate).format('YYYY-MM-DD');
//   });
//
// bookSchema.path('endDate')
//   .get(function formatDate(endDate){
//     return moment(endDate).format('YYYY-MM-DD');
//   });
//
// bookSchema.set('toJSON', { getters: true });

module.exports = mongoose.model('Group', groupSchema);

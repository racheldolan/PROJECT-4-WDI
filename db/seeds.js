const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');

const Group = require('../models/group');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase()
    .then(() => Group.create([{
      groupName: 'Sci-fi and Fantasy book club',
      image: 'https://www.astrologyzone.com/wp-content/uploads/2016/04/AZ_Planets_All.jpg',
      info: 'We read one new fantasy book and one new science fiction book a month. Each month we alternate between a theme with books nominated by our members, and a curated "random" selection from the mods.'
    },{
      groupName: 'The History Book Club',
      image: 'https://www.msgdental.co.uk/wp-content/uploads/2018/02/history-books.jpg',
      info: 'The History Book Club is the largest history and nonfiction group on Goodreads and these are some of our Focus Areas. We have welcomed worldwide members from over 171 countries; we are a large international group which spans the globe.'
    },{
      groupName: 'Horror Aficionados',
      image: 'https://pbs.twimg.com/profile_images/546125951034482688/5P4ZJhtT_400x400.jpeg',
      info: 'If you love horror literature, movies, and culture, you\'re in the right place. Whether it\'s vampires, werewolves, zombies, serial killers, plagues, or the Old Ones, you\'ll find plenty of great discussions and recommendations at HA'
    }]))
    .then(groups => console.log(`${groups.length} groups created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const Group = require('../models/group');
const User = require('../models/user');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase()
    .then(() => User.create([{
      username: 'Rachel',
      email: 'rachel@rachel.com',
      password: 'rachel',
      passwordConfirmation: 'rachel',
      admin: true
    }])
      .then(users => {
        return Group.create([{
          groupName: 'Sci-fi and Fantasy book club',
          image: 'https://www.astrologyzone.com/wp-content/uploads/2016/04/AZ_Planets_All.jpg',
          info: 'We read one new fantasy book and one new science fiction book a month. Each month we alternate between a theme with books nominated by our members, and a curated "random" selection from the mods.',
          members: users[0]
        },{
          groupName: 'The History Book Club',
          image: 'https://www.msgdental.co.uk/wp-content/uploads/2018/02/history-books.jpg',
          info: 'The History Book Club is the largest history and nonfiction group on Goodreads and these are some of our Focus Areas. We have welcomed worldwide members from over 171 countries; we are a large international group which spans the globe.'
        },{
          groupName: 'Horror Aficionados',
          image: 'https://pbs.twimg.com/profile_images/546125951034482688/5P4ZJhtT_400x400.jpeg',
          info: 'If you love horror literature, movies, and culture, you\'re in the right place. Whether it\'s vampires, werewolves, zombies, serial killers, plagues, or the Old Ones, you\'ll find plenty of great discussions and recommendations at HA'
        },{
          groupName: 'Fringe Fiction',
          image: 'https://d3i6fh83elv35t.cloudfront.net/newshour/app/uploads/2016/04/GettyImages-535837803-1024x768.jpg',
          info: 'Fringe Fiction is devoted to those who admire self-published works and want an outlet to discuss under-the-radar books with readers eager to discover fresh talent by obscure authors.'
        },{
          groupName: 'Our Classical Journey',
          image: 'https://images.gr-assets.com/groups/1510113522p8/346580.jpg',
          info: 'As a group we will read and discuss classics from authors who have penned some of the greatest literature of all time! And as you travel along you too may be inspired to pick up your quill, dip it into the ink and write the next great novel!'
        },{
          groupName: 'For Love of a Book',
          image: 'http://www.xinrenfuyin.org/newman/wp-content/uploads/2018/05/christian-love.jpg',
          info: 'This group was created to connect lovers of stories across the internet with their characters and plotlines, dreams and recommendations. Bibliophiles unite, and challenges abound. Come one, come all. All you need to join is a desire to read.'
        }]);

      }))
    .then(groups => console.log(`${groups.length} groups created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});

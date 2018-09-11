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
      image: 'https://images.unsplash.com/photo-1507402086209-7bc75ccf5369?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=76da8cd3566839e142eeace5c2823fb7&auto=format&fit=crop&w=1052&q=80'
    },{
      username: 'Linda',
      email: 'linda@linda.com',
      password: 'linda',
      passwordConfirmation: 'linda',
      image: 'https://images.unsplash.com/photo-1479088360436-ef9dbade3214?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d91c220ba53572fb8fd6bbdce6091afd&auto=format&fit=crop&w=1050&q=80'
    }, {
      username: 'Tash',
      email: 'tash@tash.com',
      password: 'tash',
      passwordConfirmation: 'tash',
      image: 'https://images.unsplash.com/photo-1484399172022-72a90b12e3c1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=164d6f8e945f1b5012d4da77cc864586&auto=format&fit=crop&w=1050&q=80'
    }, {
      username: 'Steve',
      email: 'steve@steve.com',
      password: 'steve',
      passwordConfirmation: 'steve',
      image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a723711f2c79ac1dc3c8718d82850f30&auto=format&fit=crop&w=1031&q=80'
    }, {
      username: 'Antoni',
      email: 'antoni@antoni.com',
      password: 'antoni',
      passwordConfirmation: 'antoni',
      image: 'https://images.unsplash.com/photo-1491484925566-336b202157a5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e310d9d31bd5c72f6be9f0e153ee173d&auto=format&fit=crop&w=1050&q=80'
    }, {
      username: 'Bella',
      email: 'bella@bella.com',
      password: 'bella',
      passwordConfirmation: 'bella',
      image: 'https://images.unsplash.com/photo-1492822497109-cda5caf66775?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4b779d15a0d449def011e32c1600e8d6&auto=format&fit=crop&w=1050&q=80'
    }])
      .then(users => {
        return Group.create([{
          groupName: 'Sci-fi and Fantasy book club',
          image: 'https://www.astrologyzone.com/wp-content/uploads/2016/04/AZ_Planets_All.jpg',
          info: 'We read one new fantasy book and one new science fiction book a month. Each month we alternate between a theme with books nominated by our members, and a curated "random" selection from the mods.',
          members: users[0],
          creator: users[1]
        },{
          groupName: 'The History Book Club',
          image: 'https://www.msgdental.co.uk/wp-content/uploads/2018/02/history-books.jpg',
          info: 'The History Book Club is the largest history and nonfiction group on Goodreads and these are some of our Focus Areas. We have welcomed worldwide members from over 171 countries; we are a large international group which spans the globe.',
          members: users[1],
          creator: users[2]
        },{
          groupName: 'Horror Aficionados',
          image: 'https://pbs.twimg.com/profile_images/546125951034482688/5P4ZJhtT_400x400.jpeg',
          info: 'If you love horror literature, movies, and culture, you\'re in the right place. Whether it\'s vampires, werewolves, zombies, serial killers, plagues, or the Old Ones, you\'ll find plenty of great discussions and recommendations at HA',
          members: users[2],
          creator: users[3]
        },{
          groupName: 'Fringe Fiction',
          image: 'https://d3i6fh83elv35t.cloudfront.net/newshour/app/uploads/2016/04/GettyImages-535837803-1024x768.jpg',
          info: 'Fringe Fiction is devoted to those who admire self-published works and want an outlet to discuss under-the-radar books with readers eager to discover fresh talent by obscure authors.',
          members: users[0],
          creator: users[4]
        },{
          groupName: 'Our Classical Journey',
          image: 'https://images.gr-assets.com/groups/1510113522p8/346580.jpg',
          info: 'As a group we will read and discuss classics from authors who have penned some of the greatest literature of all time! And as you travel along you too may be inspired to pick up your quill, dip it into the ink and write the next great novel!',
          members: users[4],
          creator: users[3]
        },{
          groupName: 'For Love of a Book',
          image: 'http://www.xinrenfuyin.org/newman/wp-content/uploads/2018/05/christian-love.jpg',
          info: 'This group was created to connect lovers of stories across the internet with their characters and plotlines, dreams and recommendations. Bibliophiles unite, and challenges abound. Come one, come all. All you need to join is a desire to read.',
          members: users[0],
          creator: users[1]
        }]);

      }))
    .then(groups => console.log(`${groups.length} groups created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});

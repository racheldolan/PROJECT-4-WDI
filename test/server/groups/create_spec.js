/* global api, expect, describe, it, beforeEach */
const Group = require('../../../models/group');
const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const groupData = {
  groupName: 'Sci-fi and Fantasy book club',
  image: 'https://www.astrologyzone.com/wp-content/uploads/2016/04/AZ_Planets_All.jpg',
  info: 'We read one new fantasy book and one new science fiction book a month. Each month we alternate between a theme with books nominated by our members, and a curated "random" selection from the mods.'
};

let token;

describe('POST /groups', () => {

  beforeEach(done => {
    Group.remove({})
      .then(() => User.remove({}))
      .then(() => User.create({
        username: 'testing',
        email: 'testing@testing.com',
        password: 'testing',
        passwordConfirmation: 'testing'
      }))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
        done();
      });
  });


  it('should return a 401 response without a token', done => {
    api.post('/api/groups')
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });


  it('should return a 201 response', done => {
    console.log(token);
    api.post('/api/groups')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });


  it('should return an object', done => {
    api.post('/api/groups')
      .set('Authorization', `Bearer ${token}`)
      .send(groupData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api.post('/api/groups')
      .set('Authorization', `Bearer ${token}`)
      .send(groupData)
      .end((err, res) => {
        expect(res.body.groupName).to.eq(groupData.groupName);
        expect(res.body.info).to.eq(groupData.info);
        expect(res.body.image).to.eq(groupData.image);
        done();
      });
  });



});

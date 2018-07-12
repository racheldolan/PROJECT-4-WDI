/* global api, expect, describe, it, beforeEach */
const Group = require('../../../models/group');
const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const groupData = {
  groupName: 'Sci-fi and Fantasy book club',
  image: 'https://www.astrologyzone.com/wp-content/uploads/2016/04/AZ_Planets_All.jpg',
  info: 'We read one new fantasy book and one new science fiction book a month.'
};

const newGroupData = {
  groupName: 'Horror book club',
  image: 'https://www.astrologyzone.com/wp-content/uploads/2016/04/AZ_Planets_All.jpg',
  info: 'Each month we alternate between a theme with books nominated by our members, and a curated "random" selection from the mods.'
};

let token;
let groupId;

describe('PUT /api/groups/:id', () => {

  beforeEach(done => {
    Group.remove({})
      .then(() => Group.create(groupData))
      .then(group => {
        groupId = group._id;
      })
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
    api.put(`/api/groups/${groupId}`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 200 response', done => {
    api.put(`/api/groups/${groupId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newGroupData)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an object', done => {
    api.put(`/api/groups/${groupId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newGroupData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api.put(`/api/groups/${groupId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newGroupData)
      .end((err, res) => {
        expect(res.body.groupName).to.eq(newGroupData.groupName);
        expect(res.body.image).to.eq(newGroupData.image);
        expect(res.body.info).to.eq(newGroupData.info);
        done();
      });
  });



});

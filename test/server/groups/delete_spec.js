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
let groupId;

describe('DELETE /groups/:id', () => {

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
    api.delete(`/api/groups/${groupId}`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 204 response', done => {
    api.delete(`/api/groups/${groupId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(204);
        done();
      });
  });

  it('should delete data', done => {
    api.delete(`/api/groups/${groupId}`)
      .set('Authorization', `Bearer ${token}`)
      .end(() => {
        Group.findById(groupId)
          .then(group => {
            expect(group).to.not.be.ok;
            done();
          });
      });
  });

});

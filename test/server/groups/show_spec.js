/* global api, expect, describe, it, beforeEach */
const Group = require('../../../models/group');

const groupData = {
  groupName: 'Sci-fi and Fantasy book club',
  image: 'https://www.astrologyzone.com/wp-content/uploads/2016/04/AZ_Planets_All.jpg',
  info: 'We read one new fantasy book and one new science fiction book a month. Each month we alternate between a theme with books nominated by our members, and a curated "random" selection from the mods.'
};

let groupId;

describe('GET /groups/:id', () => {

  beforeEach(done => {
    Group.remove({})
      .then(() => Group.create(groupData))
      .then(group => {
        groupId = group._id;
        done();
      });
  });

  it('should return a 200 response', done => {
    api.get(`/api/groups/${groupId}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an object', done => {
    api.get(`/api/groups/${groupId}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api.get(`/api/groups/${groupId}`)
      .end((err, res) => {
        expect(res.body.groupName).to.eq(groupData.groupName);
        expect(res.body.image).to.eq(groupData.image);
        expect(res.body.info).to.eq(groupData.info);
        done();
      });
  });

});

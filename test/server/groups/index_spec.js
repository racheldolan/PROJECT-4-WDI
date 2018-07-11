/* global api, expect, describe, it, beforeEach */
const Group = require('../../../models/group');

const groupData = [{
  groupName: 'Sci-fi and Fantasy book club',
  image: 'https://www.astrologyzone.com/wp-content/uploads/2016/04/AZ_Planets_All.jpg',
  info: 'We read one new fantasy book and one new science fiction book a month. Each month we alternate between a theme with books nominated by our members, and a curated "random" selection from the mods.'
}];

describe('GET /groups', () => {

  beforeEach(done => {
    Group.remove({})
      .then(() => Group.create(groupData))
      .then(() => done());
  });

  it('should return a 200 response', done => {
    api.get('/api/groups')
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an array', done => {
    api.get('/api/groups')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should return an array of objects', done => {
    api.get('/api/groups')
      .end((err, res) => {
        res.body.forEach(group => expect(group).to.be.an('object'));
      });
    done();
  });

  it('should return the correct data', done => {
    api.get('/api/groups')
      .end((err, res) => {
        res.body.forEach((group, index) => {
          expect(group.groupName).to.eq(groupData[index].groupName);
          expect(group.image).to.eq(groupData[index].image);
          expect(group.info).to.eq(groupData[index].info);
        });
        done();
      });
  });  

});

/* global describe, it, beforeEach, before, after, localStorage */

import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import sinon from 'sinon';
import axios from 'axios';
import Promise from 'bluebird';

import GroupsShow from '../../../src/components/groups/Show';

const data = {
  id: 1,
  groupName: 'Sci-fi and Fantasy book club',
  image: 'https://www.astrologyzone.com/wp-content/uploads/2016/04/AZ_Planets_All.jpg',
  info: 'We read one new fantasy book and one new science fiction book a month. Each month we alternate between a theme with books nominated by our members, and a curated "random" selection from the mods.'
};

describe('GroupsShow tests', () => {
  let promise;
  let wrapper;

  before(done => {
    promise = Promise.resolve({ data });
    sinon.stub(axios, 'get').returns(promise);
    done();
  });

  after(done => {
    axios.get.restore();
    done();
  });

  beforeEach(done => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/groups/1']}>
        <Route path="/groups/:id" component={GroupsShow} />
      </MemoryRouter>
    );
    done();
  });

  it('should render the correct data', done => {
    promise.then(() => {
      wrapper.update();
      expect(wrapper.find('img').prop('src')).to.eq(data.image);
      expect(wrapper.find('strong').text()).to.eq(data.groupName);
      expect(wrapper.find('Link').prop('to')).to.eq(`/groups/${data._id}/edit`);
      done();
    });
  });

});

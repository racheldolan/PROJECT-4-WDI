/* global describe, it, beforeEach, before, after */

import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import sinon from 'sinon';
import axios from 'axios';
import Promise from 'bluebird';

import GroupsIndex from '../../../src/components/groups/Index';

const data = [{
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
}];

describe('groupsIndex tests', () => {
  let wrapper;
  let promise;

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
      <MemoryRouter>
        <GroupsIndex />
      </MemoryRouter>
    );
    done();
  });

  it('should render groups', done => {
    promise.then(() => {
      wrapper.update();
      expect(wrapper.find('article.media').length).to.eq(3);
      done();
    })
      .catch(done);
  });

  it('should render the correct data', done => {
    promise.then(() => {
      wrapper.update();
      data.forEach((group, index) => {
        expect(wrapper.find('img').at(index).prop('src')).to.eq(group.image);
        expect(wrapper.find('strong').at(index).text()).to.eq(group.groupName);
        expect(wrapper.find('Link').at(index).prop('to')).to.eq(`/groups/${group._id}`);
      });
      done();
    });
  });

  it('should filter the groups', done => {
    const input = wrapper.find('input');
    promise.then(() => {
      input.simulate('change', { target: { value: 'Aficionados' } });
      wrapper.update();
      expect(wrapper.find('article.media').length).to.eq(1);


      input.simulate('change', { target: { value: 'history' } });
      wrapper.update();
      expect(wrapper.find('article.media').length).to.eq(1);


      input.simulate('change', { target: { value: 'nothing' } });
      wrapper.update();
      expect(wrapper.find('article.media').length).to.eq(0);

      done();
    });
  });


});

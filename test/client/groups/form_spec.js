/* global describe, it, beforeEach */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import GroupsForm from '../../../src/components/groups/Form';

describe('GroupsForm tests', () => {

  let wrapper;

  beforeEach(done => {
    // shallow is for functional components (it does not trigger lifecycle hooks)
    const props = {
      data: {
        groupName: 'test',
        image: 'test',
        info: 'test',
        public: 'test'
      }
    };

    wrapper = shallow(<GroupsForm {...props} />);
    done();
  });

  it('should render a form', done => {
    expect(wrapper.find('form').length).to.eq(1);
    done();
  });

  it('should render the correct inputs', done => {
    expect(wrapper.find('[name="groupName"]').length).to.eq(1);
    expect(wrapper.find('[name="image"]').length).to.eq(1);
    expect(wrapper.find('[name="info"]').length).to.eq(1);
    expect(wrapper.find('button').length).to.eq(1);
    done();
  });

  it('should populate the form', done => {
    expect(wrapper.find({ value: 'test', name: 'groupName' }).length).to.eq(1);
    expect(wrapper.find({ value: 'test', name: 'image' }).length).to.eq(1);
    expect(wrapper.find({ value: 'test', name: 'info' }).length).to.eq(1);
    done();
  });
});

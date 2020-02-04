import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Genre from '../components/genre.jsx';

Enzyme.configure({ adapter: new Adapter() });


describe('Genre Component Tests', () => {
  it('confirm genre component renders', () => {
    const wrapper = shallow(<Genre />);
    const text = wrapper.find('.hashTag');
    expect(text.text()).toBe('# ');
  });
});

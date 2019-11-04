import React from 'react';
import { shallow } from 'enzyme';
import Slide from './Slide';


it('renders without crashing', () => {
    shallow(<Slide />);
});

it('slides have images', () => {
    // TODO check that slides render with image url in the style tag
});
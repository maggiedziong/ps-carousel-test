import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  shallow(<App />);
});

it('calls the api', () => {
  //TODO
});

it('next button is working', () => {
  const component = shallow(<App />);
  const nextButton = component.find('.button.next');
  const oldState = component.state('currentIndex')

  nextButton.simulate('click')
  expect(component.state().currentIndex).toEqual(oldState + 1); 
})

it('prev button is working', () => {
  const component = shallow(<App />);
  const nextButton = component.find('.button.next');
  const prevButton = component.find('.button.previous');
  
  nextButton.simulate('click')
  
  const oldState = component.state('currentIndex')
  
  prevButton.simulate('click')
  expect(component.state().currentIndex).toEqual(oldState - 1); 
})
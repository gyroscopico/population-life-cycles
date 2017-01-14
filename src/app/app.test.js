import React from 'react';
import renderer from 'react-test-renderer';

import App from './app.jsx';

test('App can be rendered.', () => {
  // Mock Google Analytics.
  window.ga = () => {};

  const component = renderer.create(<App />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

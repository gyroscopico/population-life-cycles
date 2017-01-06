import React from 'react';
import renderer from 'react-test-renderer';

import * as M from '../__mocks__/local-storage';
import App from './app.jsx';

test('App can be rendered.', () => {
  // Use jsdom window object with a mocked localStorage.
  window.localStorage = M.localStorage;

  const component = renderer.create(<App />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

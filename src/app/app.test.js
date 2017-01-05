import React from 'react';
import renderer from 'react-test-renderer';

import App from './app.jsx';

test('App can be rendered.', () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
});

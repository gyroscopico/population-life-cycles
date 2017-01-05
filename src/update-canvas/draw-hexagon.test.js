import { drawHexagon } from './draw-hexagon';

// Mock context object.
const context = {
  beginPath: () => {},
  moveTo: () => {},
  lineTo: () => {},
  stroke: () => {},
  closePath: () => {},
};

test('drawHexagon sets the context strokeStyle to #ff0000.', () => {
  const result = drawHexagon({
    context,
    x: 0,
    y: 0,
    radius: 15,
    fillStyle: '#ff0000',
  });

  expect(result.strokeStyle).toBe('#ff0000');
});

import { drawDisc } from './draw-disc';

// Mock context object.
const context = {
  beginPath: () => {},
  moveTo: () => {},
  arc: () => {},
  fill: () => {},
  closePath: () => {},
};

test('drawDisc sets fillStyle to #ffccff.', () => {
  const result = drawDisc({
    context,
    x: 50,
    y: 35,
    radius: 10,
    fillStyle: '#ffccff',
  });

  expect(result.fillStyle).toBe('#ffccff');
});

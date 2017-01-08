import { paintTile } from './paint-tile';

// Mock context object.
const context = {
  beginPath: () => {},
  moveTo: () => {},
  lineTo: () => {},
  stroke: () => {},
  closePath: () => {},
};

// Mock tile object.
const tile = {
  x: 0,
  y: 0,
  radius: 15,
  color: '#00ff00',
};

test('paintTile sets the context strokeStyle to #00ff00.', () => {
  const result = paintTile(
    context,
    tile,
  );

  expect(result.strokeStyle).toBe('#00ff00');
});

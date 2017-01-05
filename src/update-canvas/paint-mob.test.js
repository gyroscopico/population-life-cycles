import { paintMob } from './paint-mob';

// Mock context object.
const context = {
  beginPath: () => {},
  arc: () => {},
  fill: () => {},
  closePath: () => {},
};

// Mock mob object.
const mob = {
  position: {
    x: 0,
    y: 0,
  },
  size: 10,
  color: '#0000ff',
};

test('paintMob sets fillStyle to #0000ff.', () => {
  const result = paintMob(
    context,
    mob,
  );

  expect(result.fillStyle).toBe('#0000ff');
});

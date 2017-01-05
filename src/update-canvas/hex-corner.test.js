import { hexCorner } from './hex-corner';

test('hexCorner returns cootrdinates of x and y.', () => {
  const result = hexCorner({ x: 0, y: 0 }, 10, 4);

  expect(result.x).toBe(-1.8369701987210296e-15);
  expect(result.y).toBe(-10);
});

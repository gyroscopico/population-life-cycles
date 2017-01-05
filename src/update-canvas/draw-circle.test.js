import { drawCircle } from './draw-circle';

// Mock context object.
const context = {
  beginPath: () => {},
  arc: () => {},
  stroke: () => {},
  closePath: () => {},
};

test('drawCircle sets lineWidth to 1.', () => {
    const result = drawCircle({
        context,
        x: 50,
        y: 35,
        radius: 10,
        fillStyle: '#ffccff',
    });

    expect(result.lineWidth).toBe(1);
});

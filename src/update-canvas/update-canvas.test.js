import World from '../world/world';
import { updateCanvas } from './update-canvas';

// Mock context object.
const context = {
  beginPath: () => {},
  moveTo: () => {},
  lineTo: () => {},
  stroke: () => {},
  closePath: () => {},
};

const world = new World({
  innerWidth: 50,
  innerHeight: 50,
});

test('updateCanvas returns an empty array when there is no mob.', () => {
  const result = updateCanvas({
    context,
    world,
    corpses: [],
    mobs: [],
  });

  expect(result).toEqual([]);
});

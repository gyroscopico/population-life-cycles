import World from '../world/world';
import { updateCanvasCorpses } from './update-canvas-corpses';

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

test('updateCanvas returns a context.', () => {
  const result = updateCanvasCorpses({
    context,
    world,
    corpses: [],
    mobs: [],
  });

  expect(result).toEqual(context);
});

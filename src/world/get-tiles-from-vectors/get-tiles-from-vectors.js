import * as C from '../../constants';

export const getTilesFromVectors = (input) => {
  const {
    world,
    center,
    range,
    vectors,
  } = input;

  if (range < C.RANGES.NONE || range > C.RANGES.MAXIMUM) {
    ga('send', 'event', 'Error', 'get-tiles-area.js', C.ERROR.INVALID_INPUT);
    throw new Error(C.ERROR.INVALID_INPUT);
  }

  let y;
  let x;
  const tiles = [];
  const maxY = world.tiles.length - 1;
  const maxX = world.tiles[0].length - 1;

  for (let i = 0, max = vectors.length; i < max; i += 1) {
    y = center.coordinateY + (vectors[i][0]);
    x = center.coordinateX + (vectors[i][1]);

    if (y > 0 && y < maxY && x > 0 && x < maxX) {
      tiles.push(world.tiles[y][x]);
    }
  }

  return tiles;
};

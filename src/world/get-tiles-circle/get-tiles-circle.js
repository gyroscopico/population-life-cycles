import * as C from '../../constants';

// Return all the tiles forming a circle
// all on the same range distance from center.
// @input.range: maximum range is 4.
export const getTilesCircle = (input) => {
  const {
    world,
    center,
    range,
  } = input;

  const tilesInRange = [];
  const maxY = world.tiles.length - 1;
  const maxX = world.tiles[0].length - 1;
  let y;
  let x;
  const startYIsEven = center.coordinateY % 2 === 0;

  // max: the maximum number of tiles in a circle.
  // example of max: with a range of 1, there are 6 tiles,
  // with a range of 2 there are 12 possible tiles.
  // note: this is not an area of hexagons and does not
  // include smaller concentric circles of tiles.
  for (let i = 0, max = range * 6; i < max; i += 1) {
    y = center.coordinateY +
        (startYIsEven ?
          C.VECTORS.EVEN_RANGES[range][i][0] :
          C.VECTORS.ODD_RANGES[range][i][0]);
    x = center.coordinateX +
        (startYIsEven ?
          C.VECTORS.EVEN_RANGES[range][i][1] :
          C.VECTORS.ODD_RANGES[range][i][1]);

    if (y > 0 && y < maxY && x > 0 && x < maxX) {
      tilesInRange.push(world.tiles[y][x]);
    }
  }

  return tilesInRange;
};

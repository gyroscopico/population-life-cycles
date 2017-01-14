import * as C from '../../constants';
import { getTilesFromVectors } from
  '../get-tiles-from-vectors/get-tiles-from-vectors';

// Return all the tiles forming a circle
// all on the same range distance from center.
// @input.range: maximum range is 4.
export const getTilesCircle = (input) => {
  const {
    center,
    range,
  } = input;

  // max: the maximum number of tiles in a circle.
  // example of max: with a range of 1, there are 6 tiles,
  // with a range of 2 there are 12 possible tiles.
  // note: this is not an area of hexagons and does not
  // include smaller concentric circles of tiles.
  input.vectors = center.coordinateY % 2 === 0 ?
    C.CIRCLE_VECTORS.EVEN_RANGES[range] :
    C.CIRCLE_VECTORS.ODD_RANGES[range];

  return getTilesFromVectors(input);
};

import * as C from '../../constants';
import { getTilesFromVectors } from
  '../get-tiles-from-vectors/get-tiles-from-vectors';

export const getTilesArea = (input) => {
  // Note: world is also included in input but only needed
  // later on in getTilesFromVectors.
  const {
    center,
    range,
  } = input;

  const startYIsEven = center.coordinateY % 2 === 0;

  input.vectors = startYIsEven ?
    C.AREA_VECTORS.EVEN_RANGES[range] :
    C.AREA_VECTORS.ODD_RANGES[range];

  return getTilesFromVectors(input);
};

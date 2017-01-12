import { getTilesCircle } from '../get-tiles-circle/get-tiles-circle';

export const getTilesArea = input => {
  const {
    world,
    center,
    range,
  } = input;

  let tilesInRange = [];

  for (let r = 1; r <= range; r++) {
    const tilesCircle = getTilesCircle({
      world,
      center,
      range: r,
    });

    tilesInRange = tilesInRange.concat(tilesCircle);
  }

  return tilesInRange;
};

import * as C from '../../constants';
import { isAlreadyListed } from '../is-already-listed/is-already-listed';

export const updateMatesList = (input) => {
  const {
    world,
    mobs,
  } = input;

  if (mobs.length === 0) {
    return mobs;
  }

  return mobs
    // Only check mature mobs.
    .filter(mob => mob.mature)
    .map((mob) => {
      const oppositeGender = mob.gender === C.MALE ? C.FEMALE : C.MALE;
      const mateTilesInRange = mob.getTilesInRange(world)
        .filter(tile =>
          // Include tiles where there is a mob.
          tile.isBlocked &&
          // Include tiles where mobs are of the same category.
          tile.mobCategory === mob.category &&
          // Include tiles where the mob is of opposite gender.
          tile.mobGender === oppositeGender &&
          // Include tiles where the mob is mature.
          tile.mobIsMature &&
          // Exclude the tile where the current mob is moving to.
          tile.mobId !== mob.id
        );

      if (mateTilesInRange.length > 0) {
        for (let i = 0, max = mateTilesInRange.length; i < max; i += 1) {
          const mateTile = mateTilesInRange[i];
          const listed = isAlreadyListed({
            id: mateTile.mobId,
            list: mob.matesList,
          });

          if (listed) {
            mob.matesList[listed].x = mateTile.x;
            mob.matesList[listed].y = mateTile.y;
            mob.matesList[listed].coordinateX = mateTile.coordinateX;
            mob.matesList[listed].coordinateY = mateTile.coordinateY;
          }

          if (!listed) {
            mob.matesList.push({
              id: mateTile.mobId,
              x: mateTile.x,
              y: mateTile.y,
              coordinateX: mateTile.coordinateX,
              coordinateY: mateTile.coordinateY,
            });

            mob.matesList = mob.matesList.splice(-C.LIST.MAX);
          }
        }
      }

      return mob;
    });
};

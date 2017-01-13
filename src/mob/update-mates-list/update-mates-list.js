import * as C from '../../constants';

const isAlreadyListed = (input) => {
  const {
    id,
    list,
  } = input;

  return list.filter(member => member.id === id).length > 0;
}

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
      const matesInRange = mob.getTilesInRange(world)
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

      if (matesInRange.length > 0) {
        for (let i = 0, max = matesInRange.length; i < max; i = i + 1) {
          const mate = matesInRange[i];
          const listed = isAlreadyListed({
            id: mate.id,
            list: mob.matesList,
          });

          if (listed) {
            const mateToUpdate = mob.matesList.filter(listedMate => listedMate.id === mate.id);
            // todo: only update the location of an already listed mate.
          }

          if (!listed) {
            mob.matesList.push({
              id: mate.mobId,
              x: mate.x,
              y: mate.y,
              coordinateX: mate.coordinateX,
              coordinateY: mate.coordinateY,
            });
          }
        }

      }

      return mob;
    });
};

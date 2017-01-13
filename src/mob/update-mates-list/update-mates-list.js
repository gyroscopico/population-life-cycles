import * as C from '../../constants';

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
        // todo: improve listing the mates.
        // - if the mate is already listed by mobId, only update the location.
        // - if the mate is not listed, add him/her with the
        // mobId, y, x, coordinateY and coordinateX.
        mob.matesList = matesInRange.length;
      }

      return mob;
    });
};

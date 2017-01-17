// Update the mobs matesList to remove the ones that are no longer alive.
// Always returns the mobs, whether they were updated or not.
export const removeDeadMobsFromMatesList = (input) => {
  const {
    mobs,
  } = input;

  // Is there no mob to update?
  if (!mobs || mobs.length === 0) {
    return {
      mobs,
    };
  }

  // Select only the mobs with a mates list that isn't empty.
  const mobsWithMatesList = mobs.filter(mob => mob.matesList.length > 0);
  const max = mobsWithMatesList.length;

  // Is there no matesList to tidy up?
  if (max === 0) {
    return {
      mobs,
    };
  }

  // IDs of all the mobs currently alive.
  const mobIds = mobs.map(mob => mob.id);

  // For each mob with a matesList, only keep the mobs that can
  // be found in the list of mobs still alive.
  for (let i = 0; i < max; i += 1) {
    mobsWithMatesList[i].matesList = mobsWithMatesList[i].matesList
      // Note: I prefer mobIds.inlcludes(mate.id) but IE doesn't support it.
      .filter(mate => mobIds.indexOf(mate.id) !== -1);
  }

  return {
    mobs,
  };
};

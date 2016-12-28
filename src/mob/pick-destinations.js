// Return a population of mobs with the destinations they picked.
export const pickDestinations = (mobs, world) => {
  if (!mobs || mobs.length === 0) {
    return [];
  }

  return mobs.map(mob => mob.pickDestination(world));
};

// Return a population of mobs with updated position x and y.
export const moveMobs = (mobs, world) => {
  if (!mobs || mobs.length === 0) {
    return [];
  }

  return mobs.map(mob => mob.move(world));
};

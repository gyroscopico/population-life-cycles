// Return a population of mobs with updated position x and y.
export const moveMobs = mobs => {
  if (!mobs || mobs.length === 0) {
    return [];
  }

  return mobs.map(mob => {
    mob.position.x = mob.position.x + mob.randomNumber(-2,2);
    mob.position.y = mob.position.y + mob.randomNumber(-2,2);
    mob.changed = true;
    return mob;
  });
};

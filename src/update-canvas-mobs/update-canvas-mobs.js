import { clearMob } from './clear-mob/clear-mob';
import { paintMob } from './paint-mob/paint-mob';
import { animateMobMovement } from
  './animate-mob-movement/animate-mob-movement';
import { pickMobsNextTile } from
  '../mob/pick-mobs-next-tile/pick-mobs-next-tile';

export const updateCanvasMobs = input => {
  const {
    context,
    world,
    mobs,
    delta
  } = input;

  if (mobs.length === 0) {
    return context;
  }

  // Update the position towards the destination, if any.
  mobs
    .filter(mob => mob.destination)
    .map(mob => {
      // Clear the painted mob from the location he/she is about to leave.
      clearMob(context, mob);

      // Update the position of the mob so that he can be painted there.
      // This also makes it possible for the mob to move to
      // a new set of adjacent tiles.
      if (!mob.arrivedAtDestination) {
        return animateMobMovement(mob, delta);
      }

      return mob;
    });

  pickMobsNextTile(
    mobs.filter(mob => mob.arrivedAtDestination),
    world
  );

  // Paint live mobs in their current position where they moved to.
  mobs.map(mob => paintMob(context, mob));

  return context;
};

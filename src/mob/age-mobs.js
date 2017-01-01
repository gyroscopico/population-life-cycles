import * as C from '../constants';
import { now } from '../utils/now';

// Return an aged population of mobs and corpses.
export const ageMobs = (mobs, corpses, world, years = 1) => {
  const log = [];

  mobs = mobs.filter(mob => {
    if (mob.becomeOlder(years)) {
      return mob; // This mob is years older but still alive.
    }

    // This mob just died.
    mob.timeOfDeath = now();
    mob.causeOfDeath = C.OLD_AGE;
    corpses.push(mob);

    // Is the mob tracked on the current tile?
    const currentTile = world.tiles[mob.position.coordinateY][mob.position.coordinateX];
    if (currentTile.mobId === mob.id) {
      // Remove the mob from the current tile tracking.
      currentTile.hasMob = false;
      currentTile.mobId = undefined;
    }

    // Is the mob tracked on the destination tile?
    if (mob.destination !== undefined) {
      const destinationTile = world.tiles[mob.destination.coordinateY][mob.destination.coordinateX];
      if (destinationTile.mobId === mob.id) {
        // Remove the mob from the destination tile tracking.
        destinationTile.hasMob = false;
        destinationTile.mobId = undefined;
      }
    }

    // A corpse doesn't count as a mob on a world tile (tile is free).
    // world.tiles[mob.position.coordinateY][mob.position.coordinateX].hasMob = false;

    // Log the death.
    log.push(`[death] ${mob.gender} ${mob.category},
      ${mob.age} years old, died ${mob.causeOfDeath}.`);

    return null;
  });

  return {
    mobs,
    corpses,
    world,
    log,
  };
};

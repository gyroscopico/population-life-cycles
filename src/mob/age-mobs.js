import * as C from '../constants';
import { now } from '../utils/now';
import Storage from '../storage/storage';

// Return an aged population of mobs and corpses.
export const ageMobs = (mobs, corpses, world, years = 1) => {
  const log = [];

  const agedMobs = mobs.filter(mob => {
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
      currentTile.isBlocked = false;
      currentTile.mobId = undefined;
    }

    // Is the mob tracked on the destination tile?
    if (mob.destination !== undefined) {
      const destinationTile = world.tiles[mob.destination.coordinateY][mob.destination.coordinateX];
      if (destinationTile.mobId === mob.id) {
        // Remove the mob from the destination tile tracking.
        destinationTile.isBlocked = false;
        destinationTile.mobId = undefined;
      }
    }

    // A corpse doesn't count as a mob on a world tile (tile is free).
    // world.tiles[mob.position.coordinateY][mob.position.coordinateX].isBlocked = false;

    // Log the death.
    log.push(`[death] ${mob.gender} ${mob.category}, died ${mob.causeOfDeath} \u2625${mob.age}.`);

    return null;
  });

  // Persist the new log messages to localStorage.
  const logStorage = new Storage({ masterKey: C.LOG_MASTER_KEY });
  log.map(message => logStorage.setItem(message));

  return {
    mobs: agedMobs,
    corpses,
    world,
    log,
  };
};

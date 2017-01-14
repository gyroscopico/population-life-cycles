import * as C from '../constants';
import { now } from '../utils/now';
import { clearMob } from '../update-canvas-mobs/clear-mob/clear-mob';

// Return an aged population of mobs and corpses.
export const ageMobs = (context, mobs, corpses, world, years = 1) => {
  const agedMobs = mobs.filter(mob => {
    if (mob.becomeOlder(years)) {
      return mob; // This mob is years older but still alive.
    }

    // This mob just died.
    mob.timeOfDeath = now();
    mob.causeOfDeath = C.OLD_AGE;
    corpses.push(mob);

    // Clear the mob from the current tile.
    clearMob(context, mob);

    // Is the mob tracked on the current tile?
    const currentTile = world
        .tiles[mob.position.coordinateY][mob.position.coordinateX];

    if (currentTile.mobId === mob.id) {
      currentTile.resetMobTracking();
    }

    // Is the mob tracked on the destination tile?
    if (mob.destination !== undefined) {
      const destinationTile = world
          .tiles[mob.destination.coordinateY][mob.destination.coordinateX];
      if (destinationTile.mobId === mob.id) {
        destinationTile.resetMobTracking();
      }
    }

    // Record the death in Google Analytics.
    const message = [
      `${mob.gender} ${mob.category},`,
      `died ${mob.causeOfDeath} \u2625${mob.age}.`
    ].join(' ');
    ga('send', 'event', 'Mob', 'Death', message, mob.age);

    return null;
  });

  return {
    mobs: agedMobs,
    corpses,
    world,
  };
};

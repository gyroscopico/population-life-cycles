import * as C from '../constants';
import { now } from '../utils/now';

// Return an aged population of mobs and corpses.
export const ageMobs = (population, years) => {
  const log = [];

  population.mobs = population.mobs.filter(mob => {
    if (mob.becomeOlder(years)) {
      return mob; // This mob is years older but still alive.
    } else {
      mob.timeOfDeath = now();
      mob.causeOfDeath = C.OLD_AGE;
      population.corpses.push(mob);  // This mob just died.
      log.push(`[death] ${mob.gender} ${mob.category}, ${mob.age} years old, died of ${mob.causeOfDeath}. Spawned ${mob.spawned} - \u2625${mob.timeOfDeath}.`);
    }
  });

  return {
    mobs: population.mobs,
    corpses: population.corpses,
    log,
  };
}

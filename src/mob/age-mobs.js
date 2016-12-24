import * as C from '../constants';
import { now } from '../utils/now';

// Return an aged population of mobs and corpses.
export const ageMobs = (population, years) => {
  population.mobs = population.mobs.filter(mob => {
    if (mob.becomeOlder(years)) {
      return mob; // This mob is years older but still alive.
    } else {
      mob.timeOfDeath = now();
      mob.causeOfDeath = C.OLD_AGE;
      population.corpses.push(mob);  // This mob just died.
    }
  });

  return population;
}

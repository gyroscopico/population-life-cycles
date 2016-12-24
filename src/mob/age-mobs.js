import * as C from '../constants';
import { now } from '../utils/now';

// Return an aged population of mobs (minus the dead ones).
export const ageMobs = (mobs, years, corpses) => mobs.filter(mob => {
  if (mob.becomeOlder(years)) {
    return mob; // This mob is years older but still alive.
  } else {
    mob.timeOfDeath = now();
    mob.causeOfDeath = C.OLD_AGE;
    corpses.push(mob);  // This mob just died.
  }
})

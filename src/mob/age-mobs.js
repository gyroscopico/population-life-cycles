import * as C from '../constants';
import { now } from '../utils/now';

// Return an aged population (minus the dead ones).
export const ageMobs = (mobs, years, graveyard) => mobs.filter(mob => {
  if (mob.becomeOlder(years)) {
    return mob; // This mob is years older but still alive.
  } else {
    mob.timeOfDeath = now();
    mob.causeOfDeath = C.OLD_AGE;
    graveyard.push(mob);  // This mob just died.
  }
})

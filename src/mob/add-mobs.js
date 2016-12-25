import * as C from '../constants';
import Orc from './orc/orc';
import Goblin from './goblin/goblin';
import Cat from './cat/cat';

export const addMobs = (event, input) => {
  event.preventDefault();

  const mobs = [];
  const log = [];

  const {
    toAdd,
    category,
    canvasWidth,
    canvasHeight,
  } = input;

  for (let i = 0; i < toAdd; i++) {
    let newMob;

    switch (category) {
      case C.CATEGORY.CAT:
        newMob = new Cat({ canvasWidth, canvasHeight });
        break;
      case C.CATEGORY.ORC:
        newMob = new Orc({ canvasWidth, canvasHeight });
        break;
      case C.CATEGORY.GOBLIN:
        newMob = new Goblin({ canvasWidth, canvasHeight });
        break;
      default:
        throw new Error(`${C.ERROR.UNEXPECTED_MOB_CATEGORY}: ${category}.`);
    }

    const age = newMob.age >= newMob.maturity() ? `${newMob.age} ${newMob.age > 1 ? 'years' : 'year'} old` : 'newborn';
    mobs.push(newMob);
    log.push(`[pop] ${newMob.gender} ${newMob.category} (${age}, \u2625${newMob.longevity}).`);
  }

  return {
    mobs,
    log,
  };
};

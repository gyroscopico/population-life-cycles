import * as C from '../constants';
import Orc from './orc/orc';
import Goblin from './goblin/goblin';
import Cat from './cat/cat';
import Human from './human/human';
import Faery from './faery/faery';

export const popMobs = (event, input) => {
  event.preventDefault();

  const mobs = [];
  const log = [];

  const {
    toAdd,
    category,
    world,
  } = input;

  for (let i = 0; i < toAdd; i++) {
    let newMob;

    switch (category) {
      case C.CATEGORY.ORC:
        newMob = new Orc({ world });
        break;
      case C.CATEGORY.GOBLIN:
        newMob = new Goblin({ world });
        break;
      case C.CATEGORY.CAT:
        newMob = new Cat({ world });
        break;
      case C.CATEGORY.HUMAN:
        newMob = new Human({ world });
        break;
      case C.CATEGORY.FAERY:
        newMob = new Faery({ world });
        break;
      default:
        throw new Error(`${C.ERROR.UNEXPECTED_MOB_CATEGORY}: ${category}.`);
    }

    const age = newMob.age >= newMob.maturity() ?
        `${newMob.age} ${newMob.age > 1 ? 'years' : 'year'} old` : 'newborn';
    mobs.push(newMob);
    log.push(`[pop] ${newMob.gender} ${newMob.category} (${age}, \u2625${newMob.longevity}).`);
  }

  return {
    mobs,
    world,
    log,
  };
};

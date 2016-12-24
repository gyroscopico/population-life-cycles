import * as C from '../constants';
import Orc from './orc/orc';
import Goblin from './goblin/goblin';
import Cat from './cat/cat';

export const addMobs = (event, mobs) => {
  event.preventDefault();

  const log = [];
  const toAdd = Number(event.currentTarget['number-mobs-to-add'].value);
  const category = event.currentTarget['mob-category'].value;

  if (!toAdd ||  toAdd === 0) {
    throw new Error(`Invalid number of mobs to add: ${toAdd}.`);
  }

  if (!category) {
    throw new Error(`Invalid mob category: ${category}.`);
  }

  for (let i = 0; i < toAdd; i++) {
    let newMob;

    switch (category) {
      case C.CATEGORY.CAT:
        newMob = new Cat();
        break;
      case C.CATEGORY.ORC:
        newMob = new Orc();
        break;
      case C.CATEGORY.GOBLIN:
        newMob = new Goblin();
        break;
      default:
        throw new Error(`Unexpected mob category: ${category}.`);
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

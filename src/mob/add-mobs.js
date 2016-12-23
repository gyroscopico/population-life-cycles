import * as C from '../constants';
import Orc from './orc/orc';
import Cat from './cat/cat';

export const addMobs = (event, mobs) => {
  event.preventDefault();

  const toAdd = Number(event.currentTarget['number-mobs-to-add'].value);
  const category = event.currentTarget['mob-category'].value;

  if (!toAdd ||  toAdd === 0) {
    throw new Error(`Invalid number of mobs to add: ${toAdd}.`);
  }

  if (!category) {
    throw new Error(`Invalid mob category: ${category}.`);
  }

  for (let i = 0; i < toAdd; i++) {
    switch (category) {
      case C.CATEGORY.CAT:
        mobs.push(new Cat());
        break;
      case C.CATEGORY.ORC:
        mobs.push(new Orc());
        break;
      default:
        throw new Error(`Unexpected mob category: ${category}.`);
    }
  }
};

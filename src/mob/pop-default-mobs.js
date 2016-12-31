import * as C from '../constants';
import Faery from './faery/faery';
import Human from './human/human';
import Orc from './orc/orc';
import Goblin from './goblin/goblin';
import Cat from './cat/cat';

export const popDefaultMobs = (world) => {
  const mobs = [];
  let i;

  for (i = 0; i < C.DEFAULT_MOBS.FAERY; i++) {
    const faery = new Faery({ world });
    mobs.push(faery);
  }

  for (i = 0; i < C.DEFAULT_MOBS.HUMAN; i++) {
    const human = new Human({ world });
    mobs.push(human);
  }

  for (i = 0; i < C.DEFAULT_MOBS.ORC; i++) {
    const orc = new Orc({ world });
    mobs.push(orc);
  }

  for (i = 0; i < C.DEFAULT_MOBS.GOBLIN; i++) {
    const goblin = new Goblin({ world });
    mobs.push(goblin);
  }

  for (i = 0; i < C.DEFAULT_MOBS.CAT; i++) {
    const cat = new Cat({ world });
    mobs.push(cat);
  }

  return mobs;
};

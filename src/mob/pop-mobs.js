import * as C from '../constants';
import Orc from './orc/orc';
import Goblin from './goblin/goblin';
import Cat from './cat/cat';
import Human from './human/human';
import Faery from './faery/faery';
import Storage from '../storage/storage';

// Pop a number of new mobs from a given category.
export const popMobs = (event, input) => {
  if (event !== undefined) {
    event.preventDefault();
  }

  const mobs = [];

  const {
    toAdd,
    category,
    world,
  } = input;

  let errorMessage;

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
        errorMessage = `${C.ERROR.UNEXPECTED_MOB_CATEGORY}: ${category}.`;
        ga('send', 'event', 'Error', 'pop-mob.js', errorMessage);
        throw new Error(errorMessage);
    }

    mobs.push(newMob);
  }

  // Local log.
  const log = [`${toAdd} new ${toAdd > 1 ?
    'mobs' :
    'mob'
  }, category: ${category}.`];

  // Log in Analytics how many mobs have popped.
  // ga('send', 'event', Category, Action, Label, Value).
  // @Value: the number of mobs.
  ga('send', 'event', 'Mob', 'Pop', category, toAdd);

  // Add the pop message to the log.
  const logStorage = new Storage({ masterKey: C.LOG_MASTER_KEY });
  log.map(message => logStorage.setItem(message));

  return {
    mobs,
    world,
    log,
  };
};

import * as C from '../../constants';
import Mob from '../mob';

export default class Goblin extends Mob {
  young() {
    return 'goblin young';
  }

  adult() {
    return 'goblin';
  }

  getYoungSize() {
    return C.YOUNG_GOBLIN_SIZE;
  }

  getAdultSize() {
    return C.ADULT_GOBLIN_SIZE;
  }

  getYoungColor() {
    return C.YOUNG_GOBLIN_COLOR;
  }

  getAdultColor() {
    return C.ADULT_GOBLIN_COLOR;
  }

  getDeadColor() {
    return C.DEAD_GOBLIN_COLOR;
  }
}

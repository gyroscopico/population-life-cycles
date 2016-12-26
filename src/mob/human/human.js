import * as C from '../../constants';
import Mob from '../mob';

export default class Human extends Mob {
  young() {
    return 'human child';
  }

  adult() {
    return 'human';
  }

  minLongevity() {
    return C.MIN_HUMAN_LONGEVITY;
  }

  maxLongevity() {
    return C.MAX_HUMAN_LONGEVITY;
  }

  getYoungColor() {
    return C.YOUNG_HUMAN_COLOR;
  }

  getAdultColor() {
    return C.ADULT_HUMAN_COLOR;
  }

  getDeadColor() {
    return C.DEAD_HUMAN_COLOR;
  }
}

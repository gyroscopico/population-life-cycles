import * as C from '../../constants';
import Mob from '../mob';

export default class Faery extends Mob {
  young() {
    return 'faery youth';
  }

  adult() {
    return 'faery elder';
  }

  minLongevity() {
    return C.MIN_FAERY_LONGEVITY;
  }

  maxLongevity() {
    return C.MAX_FAERY_LONGEVITY;
  }

  maturity() {
    return C.FAERY_MATURITY;
  }

  maxCreationAge() {
    return C.MAX_FAERY_CREATION_AGE;
  }

  getYoungSize() {
    return C.YOUNG_FAERY_SIZE;
  }

  getAdultSize() {
    return C.ADULT_FAERY_SIZE;
  }

  getYoungColor() {
    return C.YOUNG_FAERY_COLOR;
  }

  getAdultColor() {
    return C.ADULT_FAERY_COLOR;
  }

  getDeadColor() {
    return C.DEAD_FAERY_COLOR;
  }
}

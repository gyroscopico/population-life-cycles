import * as C from '../../constants';
import Mob from '../mob';

export default class Cat extends Mob {
  young() {
    return 'kitten';
  }

  adult() {
    return 'cat';
  }

  minLongevity() {
    return C.MIN_CAT_LONGEVITY;
  }

  maxLongevity() {
    return C.MAX_CAT_LONGEVITY;
  }

  maturity() {
    return C.CAT_MATURITY;
  }

  maxCreationAge() {
    return C.MAX_CAT_CREATION_AGE;
  }
}

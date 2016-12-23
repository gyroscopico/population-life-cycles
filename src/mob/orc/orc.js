import * as C from '../../constants';
import Mob from '../mob';

export default class Orc extends Mob {
  young() {
    return 'orc pawn';
  }

  adult() {
    return 'orc';
  }

  minLongevity() {
    return C.MIN_ORC_LONGEVITY;
  }

  maxLongevity() {
    return C.MAX_ORC_LONGEVITY;
  }
}

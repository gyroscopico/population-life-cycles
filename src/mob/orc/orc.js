import Mob from '../mob';

export default class Orc extends Mob {
  young() {
    return 'orc pawn';
  }

  adult() {
    return 'orc';
  }
}

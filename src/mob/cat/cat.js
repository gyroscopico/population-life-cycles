import Mob from '../mob';

export default class Cat extends Mob {
  young() {
    return 'kitten';
  }

  adult() {
    return 'cat';
  }
}

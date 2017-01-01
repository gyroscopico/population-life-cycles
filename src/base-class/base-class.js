import { guid } from '../utils/guid';
import { now } from '../utils/now';

export default class BaseClass {
  constructor(input) {
    // Assign all inputs as properties (if any).
    Object.assign(this, input);

    this.id = this.id || guid();
    this.spawned = this.spawned || now();
  }
}

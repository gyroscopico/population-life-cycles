import * as C from '../constants';
import { guid } from '../utils/guid';
import { now } from '../utils/now';

export default class BaseClass {
  constructor(input) {
    // Assign all inputs as properties (if any).
    Object.assign(this, input);

    this.id = guid();
    this.spawned = now();
  }
}

import { guid } from '../utils/guid';
import { now } from '../utils/now';

export default class BaseClass {
  constructor(input) {
    this.id = input && input.id || guid();
    this.spawned = input && input.spawned || now();
  }
}

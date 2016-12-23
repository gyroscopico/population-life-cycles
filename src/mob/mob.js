import * as C from '../constants';
import { guid } from '../utils/guid';
import { now } from '../utils/now';

export default class Mob {
  constructor(input) {
    // Assign all inputs as properties (if any).
    Object.assign(this, input);

    this.id = guid();
    this.gender = this.gender || this.randomGender();

    // Was this mob spawned by a player?
    // Note: Object.assign can give a value, if not default to true.
    this.isCreated = this.isCreated || true;

    // Is this mob born from other mobs?
    this.isBornFromMobs = this.isBornFromMobs || false;

    // A newborn mob from existing mobs who procreated is always 0 years of age.
    this.age = this.isBornFromMobs ? 0 : this.randomNumber(0, this.maxCreationAge());

    this.spawned = now();
    this.longevity = this.randomNumber(this.minLongevity(), this.maxLongevity());
    this.category = this.getCategory();
  }

  // Try to age a mob.
  // Return true if the mob could become older.
  // Return false and sets the age to the longevity (i.e. dead).
  becomeOlder(years) {
    if (this.age + years < this.longevity) {
      this.age = this.age + years;
      return true;
    }

    // Cannot become older.
    this.age = this.longevity;
    return false;
  }

  young() {
    return C.YOUNG;
  }

  adult() {
    return C.ADULT;
  }

  maxCreationAge() {
    return C.MAX_CREATION_AGE;
  }

  minLongevity() {
    return C.MIN_MOB_LONGEVITY;
  }

  maxLongevity() {
    return C.MAX_MOB_LONGEVITY;
  }

  // Random integer number included in a range from min to max (both inclusive).
  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randomGender() {
    return this.randomNumber(0, 9) >= 5 ? C.MALE : C.FEMALE;
  }

  isAlive() {
    return this.age < this.longevity;
  }

  canProcreate() {
    return this.age > 1 && this.isAlive();
  }

  canBecomePregnant() {
    return this.gender === C.FEMALE && this.canProcreate();
  }

  getCategory() {
    return this.age < 1 ? this.young() : this.adult();
  }
}

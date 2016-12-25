import * as C from '../constants';
import { guid } from '../utils/guid';
import { now } from '../utils/now';
import BaseClass from '../base-class/base-class';

export default class Mob extends BaseClass {
  constructor(input) {
    super(input);

    // Assign all inputs as properties (if any).
    Object.assign(this, input);

    this.gender = this.gender || this.randomGender();

    // Was this mob spawned by a player?
    // Note: Object.assign can give a value, if not default to true.
    this.isCreatedByPlayer = this.isCreatedByPlayer || true;

    // Is this mob born from other mobs?
    this.isBornFromMobs = this.isBornFromMobs || false;

    // A newborn mob from existing mobs who procreated is always 0 years of age.
    this.age = this.isBornFromMobs ? 0 : this.randomNumber(0, this.maxCreationAge());

    this.position = this.position || {
      x: this.randomNumber(C.WORLD_TILE_SIZE / 2, (this.canvasWidth || C.CANVAS_WIDTH) - C.WORLD_TILE_SIZE / 2),
      y: this.randomNumber(C.WORLD_TILE_SIZE / 2, (this.canvasHeight || C.CANVAS_HEIGHT) - C.WORLD_TILE_SIZE / 2),
    };

    this.size = this.getSize();
    this.color = this.getColor();

    this.longevity = this.randomNumber(this.minLongevity(), this.maxLongevity());
    this.category = this.getCategory();
  }

  // Try to age a mob.
  // Return true if the mob could become older.
  // Return false and sets the age to the longevity (i.e. dead).
  becomeOlder(years) {
    if (this.age + years < this.longevity) {
      this.age = this.age + years;
      this.category = this.getCategory();
      this.size = this.getSize();
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

  getYoungSize() {
    return C.YOUNG_SIZE;
  }

  getAdultSize() {
    return C.ADULT_SIZE;
  }

  getSize() {
    return this.isMature() ? this.getAdultSize() : this.getYoungSize();
  }

  getYoungColor() {
    return C.YOUNG_COLOR;
  }

  getAdultColor() {
    return C.ADULT_COLOR;
  }

  getDeadColor() {
    return C.DEAD_COLOR;
  }

  getColor() {
    if (!this.isAlive()) {
      return this.getDeadColor();
    }

    return this.isMature() ? this.getAdultColor() : this.getYoungColor();
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

  maturity() {
    return C.MATURITY;
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

  isMature() {
    return this.age >= this.maturity();
  }

  canProcreate() {
    return this.isMature() && this.isAlive();
  }

  canBecomePregnant() {
    return this.gender === C.FEMALE && this.canProcreate();
  }

  getCategory() {
    return this.age < this.maturity() ? this.young() : this.adult();
  }
}

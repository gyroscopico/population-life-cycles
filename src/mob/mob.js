import * as C from '../constants';
import BaseClass from '../base-class/base-class';

// Note: methods starting with an underscore are meant to be private, i.e. not called outside this class.
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
    this.longevity = this.randomNumber(this.minLongevity(), this.maxLongevity());

    // Category is related to age (young vs adult), so category should be defined after age.
    this.category = this._getCategory();

    // Initial state of changed is true because I want to display the mob.
    this.changed = true;

    // Position, size and color are properties used on canvas.
    if (this.position === undefined) {
      this.positionMobInWorld();
    }
    this.size = this._getSize();
    this.color = this._getColor();
  }

  getRandomTile() {
    const freeTiles = [];

    for (let y = 0; y < this.world.tiles.length; y++) {
      for (let x = 0; x < this.world.tiles[y].length; x++) {
        if (!this.world.tiles[y][x].hasMob) {
          freeTiles.push(this.world.tiles[y][x]);
        }
      }
    }

    if (freeTiles.length === 0) {
      throw new Error(C.ERROR.WORLD_IS_FULL);
    }

    const randomIndex = this.randomNumber(0, freeTiles.length - 1);

    const tile = freeTiles[randomIndex];

    tile.hasMob = true;

    return tile;
  }

  positionMobInWorld() {
    const tile = this.getRandomTile();

    this.position = {
      x: tile.x,
      y: tile.y,
      coordinateX: tile.coordinateX,
      coordinateY: tile.coordinateY,
    };
  }

  // Track if the mob has changed.
  // Note: only previous properties relevant to canvas painting.
  updatePrevious() {
    this.previous = {
      position: this.position,
      size: this.size,
      color: this.color,
    };
  }

  // Flag a change has happened.
  updateChangedFlag() {
    this.changed = this.position !== this.previous.position ||
        this.size !== this.previous.size ||
        this.color !== this.previous.color;
  }

  // Try to age a mob.
  becomeOlder(years) {
    // Keep track of previous properties about to be changed.
    this.updatePrevious();

    // Age by a number of years or stop aging (dead).
    this.age = this.age + years < this.longevity ? this.age + years : this.longevity;

    // Age related properties (will change based on age).
    // Warning: do not call the private _get methods outside this class.
    this.category = this._getCategory();
    this.size = this._getSize();
    this.color = this._getColor();

    // Update the changed flag if the mob has changed within becomeOlder.
    this.updateChangedFlag();

    // Return true if the mob could become older.
    // Return false and sets the age to the longevity (i.e. dead).
    return this.age < this.longevity;
  }

  // Try to pick a free hexagon where the mob wants to move to.
  pickDestination(world) {
    // Pick a free hexagon coordinates here, the code
    // to animate to it with x, y will be elsewhere.
    const destinationY = this.randomNumber(0, world.tiles.length);
    const destinationX = this.randomNumber(0, world.tiles[destinationY].length);
    this.destination = world.tiles[destinationY][destinationX];

    return this;
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

  _getSize() {
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

  _getColor() {
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

  _getCategory() {
    return this.age < this.maturity() ? this.young() : this.adult();
  }
}

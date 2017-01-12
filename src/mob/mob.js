import * as C from '../constants';
import BaseClass from '../base-class/base-class';
import { getTilesArea }
  from '../world/get-tiles-area/get-tiles-area';
import { pickMobsNextTile } from './pick-mobs-next-tile';

// Note: methods starting with an underscore are meant to be private,
// i.e. not called outside this class.
export default class Mob extends BaseClass {
  constructor(input) {
    super(input);

    const world = input && input.world;

    if (!world) {
      ga('send', 'event', 'Error', 'mob.js', C.ERROR.INVALID_INPUT);
      throw new Error(C.ERROR.INVALID_INPUT);
    }

    this.gender = input && input.gender || this.randomGender();

    // Was this mob spawned by a player?
    this.isCreatedByPlayer = input && input.isCreatedByPlayer || true;

    // Is this mob born from other mobs?
    this.isBornFromMobs = input && input.isBornFromMobs || false;

    // A newborn mob from existing mobs who procreated is always 0 years of age.
    if (input && input.age !== undefined) {
      this.age = input.age;
    } else {
      this.age = input && input.isBornFromMobs ?
        0 :
        this.randomNumber(0, this.maxCreationAge());
    }
    this.longevity = this.randomNumber(
      this.minLongevity(),
      this.maxLongevity()
    );

    // Category is related to age (young vs adult),
    // so category should be defined after age.
    this.category = this._getCategory();

    this.speed = input && input.speed || this.getSpeed();
    this.range = input && input.range || this.getRange();

    // Position, size and color are properties used on canvas.
    if (this.position === undefined) {
      this.positionMobInWorld(world);
    }
    this.size = this._getSize();
    this.color = this._getColor();

    // All mobs pick a next tile adjacent to the current one.
    pickMobsNextTile([this], world);
  }

  getRandomTile(world) {
    const freeTiles = [];

    // Tiles that are on the top and left edges are off-limit
    // to pop a new mob.
    const edgesOffLimit = 1;

    for (let y = edgesOffLimit; y < world.tiles.length; y++) {
      for (let x = edgesOffLimit; x < world.tiles[y].length; x++) {
        if (!world.tiles[y][x].isBlocked) {
          freeTiles.push(world.tiles[y][x]);
        }
      }
    }

    if (freeTiles.length === 0) {
      ga('send', 'event', 'Error', 'mob.js', C.ERROR.WORLD_IS_FULL);
      throw new Error(C.ERROR.WORLD_IS_FULL);
    }

    const randomIndex = this.randomNumber(0, freeTiles.length - 1);

    const tile = freeTiles[randomIndex];

    tile.trackMob({
      id: this.id,
      category: this.category,
      gender: this.gender,
    });

    return tile;
  }

  // Returns the tiles around the mob current hexagon,
  // short range by default (i.e. 6 immediate tiles).
  getAdjacentTiles(world, range = C.RANGES.SHORT) {
    return getTilesArea({
      world,
      center: {
        coordinateY: this.position.coordinateY,
        coordinateX: this.position.coordinateX,
      },
      range,
    });
  }

  positionMobInWorld(world) {
    const tile = this.getRandomTile(world);

    this.position = {
      x: tile.x,
      y: tile.y,
      coordinateX: tile.coordinateX,
      coordinateY: tile.coordinateY,
    };
  }

  // Try to age a mob.
  becomeOlder(years) {
    // Age by a number of years or stop aging (dead).
    this.age = this.age + years < this.longevity ?
      this.age + years :
      this.longevity;

    // Age related properties (will change based on age).
    // Warning: do not call the private _get methods outside this class.
    this.category = this._getCategory();
    this.size = this._getSize();
    this.color = this._getColor();

    // Return true if the mob could become older.
    // Return false and sets the age to the longevity (i.e. dead).
    return this.age < this.longevity;
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

  getSpeed() {
    return C.MOB_SPEED;
  }

  getRange() {
    return C.MOB_RANGE;
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

import * as C from '../constants';
import BaseClass from '../base-class/base-class';
import { pickMobsNextTile } from '../mob/pick-mobs-next-tile';

// Note: methods starting with an underscore are meant to be private,
// i.e. not called outside this class.
export default class Mob extends BaseClass {
  constructor(input) {
    super(input);

    const world = input && input.world;

    if (!world) {
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
      throw new Error(C.ERROR.WORLD_IS_FULL);
    }

    const randomIndex = this.randomNumber(0, freeTiles.length - 1);

    const tile = freeTiles[randomIndex];

    tile.isBlocked = true;
    tile.mobId = this.id;

    return tile;
  }

  // List all tiles around the mob current hexagon.
  getAdjacentTiles(world) {
    // The starting position of y is odd.
    const directionsFromOddY = [
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, -1],
      [-1, 0],
      [0, 1]
    ];

    // The starting position of y is even.
    const directionsFromEvenY = [
      [1, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
      [-1, 1],
      [0, 1]
    ];

    const adjacentTiles = [];
    const maxY = world.tiles.length - 1;
    const maxX = world.tiles[0].length - 1;
    let y;
    let x;
    const startYIsEven = this.position.coordinateY % 2 === 0;

    for (let i = 0; i <= 5; i++) {
      y = this.position.coordinateY +
          (startYIsEven ? directionsFromEvenY[i][0] : directionsFromOddY[i][0]);
      x = this.position.coordinateX +
          (startYIsEven ? directionsFromEvenY[i][1] : directionsFromOddY[i][1]);

      if (y < 0 || y > maxY || x < 0 || x > maxX) {
        continue;
      } else {
        adjacentTiles.push(world.tiles[y][x]);
      }
    }

    return adjacentTiles;
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

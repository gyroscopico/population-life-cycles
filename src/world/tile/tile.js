import * as C from '../../constants';
import BaseClass from '../../base-class/base-class';

export default class Tile extends BaseClass {
  constructor(input) {
    super(input);

    // Full size on one side.
    this.size = input && input.size || C.TILE_SIZE;
    this.radius = this.size / 2;

    this.color = input && input.color || C.TILE_COLOR;

    this.y = input && input.y || 0;
    this.x = input && input.x || 0;
    this.coordinateY = input && input.coordinateY || 0;
    this.coordinateX = input && input.coordinateX || 0;

    this.resetMobTracking();
  }

  // Remove any mob from this tile's tracking.
  resetMobTracking() {
    this.isBlocked = false;
    this.mobId = undefined;
    this.mobCategory = undefined;
    this.mobGender = undefined;
    this.mobIsMature = undefined;
  }

  // Set this tile to track a mob.
  trackMob(input) {
    const {
      id,
      category,
      gender,
      mature,
    } = input;

    this.isBlocked = true;
    this.mobId = id;
    this.mobCategory = category;
    this.mobGender = gender;
    this.mobIsMature = mature;
  }
}

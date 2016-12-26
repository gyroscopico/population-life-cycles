import * as C from '../../constants';
import BaseClass from '../../base-class/base-class';

export default class Tile extends BaseClass {
  constructor(input) {
    super(input);

    // Initial state of changed is true because
    // I want to display the tile at least once.
    this.changed = true;

    // Full size on one side.
    this.size = this.size || C.TILE_SIZE;
    this.radius = this.size / 2;

    this.color = this.color || C.TILE_COLOR;

    this.hasMob = false;
  }
}

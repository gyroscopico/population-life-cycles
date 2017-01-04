import * as C from '../../constants';
import BaseClass from '../../base-class/base-class';

export default class Tile extends BaseClass {
  constructor(input) {
    super(input);

    // Full size on one side.
    this.size = input && input.size || C.TILE_SIZE;
    this.radius = this.size / 2;

    this.color = input && input.color || C.TILE_COLOR;

    this.isBlocked = false;
    this.mobId = undefined;

    this.y = input && input.y || 0;
    this.x = input && input.x || 0;
    this.coordinateY = input && input.coordinateY || 0;
    this.coordinateX = input && input.coordinateX || 0;
  }
}

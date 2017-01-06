import * as C from '../constants';
import BaseClass from '../base-class/base-class';
import Tile from './tile/tile';

export default class World extends BaseClass {
  constructor(input) {
    super(input);

    // Total world canvas width and height in pixels.
    this.width = window.innerWidth;
    this.height = window.innerHeight - C.HEADER_HEIGHT;

    // Array of tile objects.
    this.tiles = this._fillWorldWithTiles();
  }

  _fillWorldWithTiles() {
    const tiles = [];
    const fullTile = C.TILE_SIZE;
    const halfTile = fullTile / 2;
    const angleDeg = 30;
    const angleRad = angleDeg * Math.PI / 180;
    const horizontalIncrement = fullTile * Math.cos(angleRad);
    const verticalIncrement = fullTile * 3 / 4;
    let shift = false;
    let coordinateX = 0;
    let coordinateY = 0;

    for (let y = 0; y <= this.height + halfTile; y = y + verticalIncrement) {
      tiles.push([]);
      for (let x = shift ? 0 : horizontalIncrement / 2;
          x <= this.width + halfTile;
          x = x + horizontalIncrement) {
        tiles[coordinateY].push(new Tile({ x, y, coordinateX, coordinateY }));
        coordinateX++;
      }
      shift = !shift;
      coordinateX = 0;
      coordinateY++;
    }

    return tiles;
  }
}

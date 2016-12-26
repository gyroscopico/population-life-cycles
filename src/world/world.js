import * as C from '../constants';
import BaseClass from '../base-class/base-class';
import Tile from './tile/tile';

export default class World extends BaseClass {
  constructor(input) {
    super(input);

    // Total world canvas width and height in pixels.
    this.width = window.innerWidth;
    this.height = window.innerHeight - C.HEADER_HEIGHT; // height minus the header.

    // Array of tile objects.
    this.tiles = this._fillWorldWithTiles();
  }

  _fillWorldWithTiles() {
    const tiles = [];
    const fullTile = C.TILE_SIZE;
    const halfTile = fullTile / 2;

    for (let x = halfTile; x <= this.width - halfTile; x = x + fullTile) {
      for (let y = halfTile; y <= this.height - halfTile; y = y + fullTile) {
        tiles.push(new Tile({ x, y }));
      }
    }

    return tiles;
  }
}

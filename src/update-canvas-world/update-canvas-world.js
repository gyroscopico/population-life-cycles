import * as C from '../constants';
import { paintTile } from './paint-tile/paint-tile';
import { writeCoordinates } from './write-coordinates/write-coordinates';

export const updateCanvasWorld = input => {
  const {
    context,
    world,
  } = input;

  // Paint world tiles.
  for (let y = 0; y < world.tiles.length; y++) {
    for (let x = 0; x < world.tiles[y].length; x++) {
      paintTile(context, world.tiles[y][x]);

      if (C.DEBUG) {
        writeCoordinates(context, world.tiles[y][x]);
      }
    }
  }

  return context;
};

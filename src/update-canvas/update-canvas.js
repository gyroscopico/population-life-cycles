import * as C from '../constants';
import { paintMob } from './paint-mob';
import { paintTile } from './paint-tile';
import { writeCoordinates } from './write-coordinates';

export const updateCanvas = input => {
  const {
    context,
    world,
    corpses,
    mobs,
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

  // Paint corpses.
  corpses.map(corpse => paintMob(context, corpse));

  // Update the position towards the destination, if any.
  mobs
    .filter(mob => mob.destination)
    .map(mob => {
      // Paint over the spot the mob is about to leave.
      paintMob(context, mob, C.COLOR.WHITE);

      // Update the position of the mob so that he can be painted there.
      // This also makes it possible for the mob to move to a new set of adjacent tiles.
      mob.position.y = mob.destination.y;
      mob.position.x = mob.destination.x;
      mob.position.coordinateY = mob.destination.coordinateY;
      mob.position.coordinateX = mob.destination.coordinateX;

      return mob;
    });

  // Paint live mobs in their current position where they moved to.
  mobs.map(mob => paintMob(context, mob));
};

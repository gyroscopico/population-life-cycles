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
    .filter(mob => mob.destination &&
        Math.floor(mob.destination.coordinateY) !== Math.floor(mob.position.coordinateY) &&
        Math.floor(mob.destination.coordinateX) !== Math.floor(mob.position.coordinateX))
    .map(mob => {
      paintMob(context, mob, C.COLOR.WHITE);

      if (Math.floor(mob.position.y) !== Math.floor(mob.destination.y)) {
        mob.position.y =
            mob.destination.y > mob.position.y ?
            mob.position.y + mob.speed :
            mob.position.y - mob.speed;
      }

      if (Math.floor(mob.position.x) !== Math.floor(mob.destination.x)) {
        mob.position.x =
            mob.destination.x > mob.position.x ?
            mob.position.x + mob.speed :
            mob.position.x - mob.speed;
      }

      return mob;
    });

  // Paint live mobs.
  mobs.map(mob => paintMob(context, mob));
};

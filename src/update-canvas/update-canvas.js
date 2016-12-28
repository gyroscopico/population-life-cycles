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

  for (let y = 0; y < world.tiles.length; y++) {
    for (let x = 0; x < world.tiles[y].length; x++) {
      if (world.tiles[y][x].changed) {
        paintTile(context, world.tiles[y][x]);
        writeCoordinates(context, world.tiles[y][x]);
      }
    }
  }

  corpses
    .filter(corpse => corpse.changed)
    .map(corpse => paintMob(context, corpse));

  // Update the position towards the destination, if any.
  mobs
    .filter(mob => mob.destination && mob.destination.coordinateY !== mob.position.coordinateY &&
        mob.destination.coordinateX !== mob.position.coordinateX)
    .map(mob => {
      mob.position.y = mob.destination.y > mob.position.y ? mob.position.y + 1 : mob.position.y - 1;
      mob.position.x = mob.destination.x > mob.position.x ? mob.position.x + 1 : mob.position.x - 1;
      mob.changed = true;
    });

  mobs
    .filter(mob => mob.changed)
    .map(mob => paintMob(context, mob));
};

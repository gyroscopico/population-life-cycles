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

  mobs
    .filter(mob => mob.changed)
    .map(mob => paintMob(context, mob));
};

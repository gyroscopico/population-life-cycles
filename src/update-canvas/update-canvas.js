import { paintMob } from './paint-mob';
import { paintTile } from './paint-tile';

export const updateCanvas = input => {
  const {
    context,
    world,
    corpses,
    mobs,
  } = input;

  world.tiles
    .filter(tile => tile.changed)
    .map(tile => paintTile(context, tile));

  corpses
    .filter(corpse => corpse.changed)
    .map(corpse => paintMob(context, corpse));

  mobs
    .filter(mob => mob.changed)
    .map(mob => paintMob(context, mob));
};

import * as C from '../constants';

// Try to pick free tiles where the mobs will move to.
export const pickMobsNextTile = (mobs, world) => {
  if (!world || !world.tiles || world.tiles.length === 0) {
    throw new Error(C.ERROR.INVALID_INPUT);
  }

  const orientedMobs = mobs.map(mob => {
    const adjacentTiles = mob.getAdjacentTiles(world);

    // Only pick a tile that doesn't currently have a mob on it.
    const freeTiles = adjacentTiles.filter(tile => !tile.isBlocked);

    if (freeTiles.length === 0) {
      return mob;
    }

    // A valid tile (free, no mob) can be selected.
    const tile = freeTiles[mob.randomNumber(0, freeTiles.length - 1)];

    // Leave the current tile.
    world
      .tiles[mob.position.coordinateY][mob.position.coordinateX]
      .isBlocked = false;
    world
      .tiles[mob.position.coordinateY][mob.position.coordinateX]
      .mobId = undefined;

    // Occupy the next tile.
    world.tiles[tile.coordinateY][tile.coordinateX].isBlocked = true;
    world.tiles[tile.coordinateY][tile.coordinateX].mobId = mob.id;

    // Update the destination of the mob.
    mob.destination = {
      y: tile.y,
      x: tile.x,
      coordinateY: tile.coordinateY,
      coordinateX: tile.coordinateX,
    };
    mob.arrivedAtDestination = false;

    return mob;
  });

  return {
    mobs: orientedMobs,
    world,
  };
};

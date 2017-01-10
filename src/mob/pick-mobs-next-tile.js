import * as C from '../constants';

// Try to pick free tiles where the mobs will move to.
export const pickMobsNextTile = (mobs, world) => {
  if (!world || !world.tiles || world.tiles.length === 0) {
    throw new Error(C.ERROR.INVALID_INPUT);
  }

  const orientedMobs = mobs.map(mob => {
    const adjacentTiles = mob.getAdjacentTiles(world);

    const freeTiles = adjacentTiles
      // Only pick a tile that doesn't currently have a mob on it.
      .filter(tile => !tile.isBlocked)
      // Don't pick a tile that is close to the top or left edge of the world.
      .filter(tile => tile.coordinateX > 0 && tile.coordinateY > 0);

    if (freeTiles.length === 0) {
      return mob;
    }

    // A valid tile (free, no mob) can be selected.
    const tile = freeTiles[mob.randomNumber(0, freeTiles.length - 1)];

    // Leave the current tile.
    world
      .tiles[mob.position.coordinateY][mob.position.coordinateX]
      .resetMobTracking();

    // Occupy the next tile.
    world
      .tiles[tile.coordinateY][tile.coordinateX]
      .trackMob({
        id: mob.id,
        category: mob.category,
        gender: mob.gender,
      });

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

// Try to pick free tiles where the mobs will move to.
export const pickMobsNextTile = (mobs, world) => {
  mobs = mobs.map(mob => {
    const adjacentTiles = mob.getAdjacentTiles(world);

    // Only pick a tile that doesn't currently have a mob on it.
    const freeTiles = adjacentTiles.filter(tile => !tile.hasMob);

    if (freeTiles.length === 0) {
      return mob;
    }

    // A valid tile (free, no mob) can be selected.
    const tile = freeTiles[mob.randomNumber(0, freeTiles.length - 1)];

    // Leave the current tile.
    world.tiles[mob.position.coordinateY][mob.position.coordinateX].hasMob = false;
    world.tiles[mob.position.coordinateY][mob.position.coordinateX].mobId = undefined;

    // Occupy the next tile.
    world.tiles[tile.coordinateY][tile.coordinateX].hasMob = true;
    world.tiles[tile.coordinateY][tile.coordinateX].mobId = mob.id;

    // Update the destination of the mob.
    mob.destination = tile;
    mob.arrivedAtDestination = false;

    return mob;
  });

  return {
    mobs,
    world,
  };
};

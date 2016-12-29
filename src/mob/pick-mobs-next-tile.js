// Try to pick free tiles where the mobs will move to.
export const pickMobsNextTile = (mobs, world) => {
  mobs = mobs.map(mob => {
    const adjacentTiles = mob.getAdjacentTiles(world);
    const tile = adjacentTiles[mob.randomNumber(0, adjacentTiles.length - 1)];

    // Leave the current tile.
    world.tiles[mob.position.coordinateY][mob.position.coordinateX].hasMob = false;

    // Occupy the next tile.
    world.tiles[tile.coordinateY][tile.coordinateX].hasMob = true;

    // Update the destination of the mob.
    mob.destination = tile;

    return mob;
  });

  return {
    mobs,
    world,
  };
}

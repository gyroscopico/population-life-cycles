export const animateMobMovement = (mob, delta) => {
  // Make position and destination comparable.
  const posY = Math.round(mob.position.y, 0);
  const posX = Math.round(mob.position.x, 0);
  const desY = Math.round(mob.destination.y, 0);
  const desX = Math.round(mob.destination.x, 0);

  // Has mob arrived at destination?
  if (posY === desY && posX === desX) {
    mob.position.y = mob.destination.y;
    mob.position.x = mob.destination.x;
    mob.position.coordinateY = mob.destination.coordinateY;
    mob.position.coordinateX = mob.destination.coordinateX;
    mob.arrivedAtDestination = true;

    return mob;
  }

  // Animate movement.
  if (posY > desY) {
    mob.position.y -= mob.speed / delta;
  }

  if (posY < desY) {
    mob.position.y += mob.speed / delta;
  }

  if (posX > desX) {
    mob.position.x -= mob.speed / delta;
  }

  if (posX < desX) {
    mob.position.x += mob.speed / delta;
  }

  return mob;
};

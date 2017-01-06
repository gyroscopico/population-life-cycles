export const animateMobMovement = mob => {
  // Make position and destination comparable.
  const posY = Math.floor(mob.position.y);
  const posX = Math.floor(mob.position.x);
  const desY = Math.floor(mob.destination.y);
  const desX = Math.floor(mob.destination.x);

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
    mob.position.y = mob.position.y - mob.speed;
  }
  if (posY < desY) {
    mob.position.y = mob.position.y + mob.speed;
  }
  if (posX > desX) {
    mob.position.x = mob.position.x - mob.speed;
  }
  if (posX < desX) {
    mob.position.x = mob.position.x + mob.speed;
  }

  return mob;
};

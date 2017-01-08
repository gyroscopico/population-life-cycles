import { clearCanvas } from '../clear-canvas/clear-canvas';

export const clearMob = (context, mob) => {
  // Clear a square greater than mob by 1 pixel.
  const extraPixel = 1;

  const topLeft = {
    x: Math.floor(mob.position.x - mob.size) - extraPixel,
    y: Math.floor(mob.position.y - mob.size) - extraPixel,
  };

  const bottomRight = {
    x: Math.floor(mob.position.x + mob.size) - extraPixel,
    y: Math.floor(mob.position.y + mob.size) - extraPixel,
  };

  return clearCanvas({
    context,
    topLeft,
    bottomRight,
  });
};

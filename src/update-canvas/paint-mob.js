import { drawDisc } from './draw-disc';

export const paintMob = (context, mob) => {
  mob.changed = false; // Changed to false to prevent repainting the same change.
  drawDisc({
    context,
    x: mob.position.x,
    y: mob.position.y,
    radius: mob.size,
    fillStyle: mob.color,
  });
};

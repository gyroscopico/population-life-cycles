import { drawDisc } from './draw-disc';

export const paintMob = (context, mob, fillStyle) => {
  drawDisc({
    context,
    x: mob.position.x,
    y: mob.position.y,
    radius: mob.size + (fillStyle ? 1 : 0),
    fillStyle: fillStyle || mob.color,
  });

  mob.changed = false; // Changed to false to prevent repainting the same change.

  return mob;
};

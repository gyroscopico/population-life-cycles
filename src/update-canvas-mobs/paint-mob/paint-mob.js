import { drawDisc } from '../draw-disc/draw-disc';

// @fillStyle: optional, when specified it means the mob died
// and it's the corpse that gets painted.
export const paintMob = (context, mob, fillStyle) => drawDisc({
  context,
  x: mob.position.x,
  y: mob.position.y,
  radius: mob.size + (fillStyle ? 1 : 0),
  fillStyle: fillStyle || mob.color,
});

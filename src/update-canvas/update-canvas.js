import * as C from '../constants';

const drawDisc = input => {
  const {
    context,
    x,
    y,
    radius,
    fillStyle,
  } = input;

  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.fillStyle = fillStyle;
  context.fill();
  context.closePath();
}

export const updateCanvas = input => {
  const {
    context,
    mobs,
    corpses,
  } = input;

  corpses
    .filter(corpse => corpse.changed === undefined || corpse.changed)
    .map(corpse => {
      corpse.changed = false; // Changed to false to prevent repainting the same change.
      drawDisc({
        context,
        x: corpse.position.x,
        y: corpse.position.y,
        radius: corpse.size,
        fillStyle: corpse.color,
      });
    });

  mobs
    .filter(mob => mob.changed === undefined || mob.changed)
    .map(mob => {
      mob.changed = false; // Changed to false to prevent repainting the same change.
      drawDisc({
        context,
        x: mob.position.x,
        y: mob.position.y,
        radius: mob.size,
        fillStyle: mob.color,
      });
    });
};

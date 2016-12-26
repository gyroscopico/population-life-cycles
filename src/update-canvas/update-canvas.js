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
};

const paint = (context, mob) => {
  mob.changed = false; // Changed to false to prevent repainting the same change.
  drawDisc({
    context,
    x: mob.position.x,
    y: mob.position.y,
    radius: mob.size,
    fillStyle: mob.color,
  });
};

export const updateCanvas = input => {
  const {
    context,
    mobs,
    corpses,
  } = input;

  corpses
    .filter(corpse => corpse.changed === undefined || corpse.changed)
    .map(corpse => paint(context, corpse));

  mobs
    .filter(mob => mob.changed === undefined || mob.changed)
    .map(mob => paint(context, mob));
};

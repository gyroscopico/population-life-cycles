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
    canvas,
    context,
    mobs,
    corpses,
  } = input;

  corpses.map(corpse => drawDisc({
    context,
    x: corpse.position.x,
    y: corpse.position.y,
    radius: corpse.getSize(),
    fillStyle: corpse.getColor(),
  }));

  mobs.map(mob => drawDisc({
    context,
    x: mob.position.x,
    y: mob.position.y,
    radius: mob.getSize(),
    fillStyle: mob.getColor(),
  }));
};

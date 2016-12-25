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
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
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

  // todo: mobs not spawning on top of each other (world with available or taken coordinates?).
  // todo: mobs moving around.
  // todo: responsive canvas (not using css though).
  // todo: how do I navigate a world that is bigger than the viewport?

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

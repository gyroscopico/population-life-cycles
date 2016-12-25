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
  // todo: mobs moving around (no collision).
  // todo: mobs procreate when they are close, the female mob becomes pregnant and eventually gives birth to a number of youngs.
  // todo: gzip the bundle with https://www.npmjs.com/package/compression-webpack-plugin
  // todo: responsive canvas (not using css though).
  // todo: how do I navigate a world that is bigger than the viewport?
  // todo: corpse decay; after a while, the corpses disappear off the game (including from the corpse array).
  // todo: log; older log messages should be removed from the web UI to save memory. Possibly archive them in localStorage but never delete data from everywhere.
  // todo: use localStorage to get some persistence locally in the browser and load previous data.
  // todo: use online data store like https://firebase.google.com/ to store data.

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

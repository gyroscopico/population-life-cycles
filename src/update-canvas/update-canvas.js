export const updateCanvas = input => {
  const {
    canvas,
    context,
    mobs,
    corpses,
  } = input;

  // todo: when a mob dies, it should no longer be on the canvas.
  // todo: responsive canvas (not using css though).

  context.fillStyle = '#F3F3CC';
  corpses.map(corpse => context.fillRect(corpse.position.x, corpse.position.y, 10, 10));

  context.fillStyle = '#9EB847';
  mobs.map(mob => context.fillRect(mob.position.x, mob.position.y, 10, 10));
};

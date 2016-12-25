export const updateCanvas = input => {
  const {
    canvas,
    mobs,
  } = input;

  const ctx = canvas.getContext('2d');

  // todo: implement displayed squares for each mob. Each mob will need a position.
  // todo: responsive canvas (not using css though).

  ctx.fillStyle = 'green';
  ctx.fillRect(1, 1, mobs.length, mobs.length);
};

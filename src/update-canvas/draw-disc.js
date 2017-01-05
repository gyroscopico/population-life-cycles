export const drawDisc = input => {
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

  return context;
};

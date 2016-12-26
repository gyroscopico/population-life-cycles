// See http://scienceprimer.com/drawing-regular-polygons-javascript-canvas

export const drawHexagon = input => {
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

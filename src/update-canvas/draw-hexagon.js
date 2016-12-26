// See http://scienceprimer.com/drawing-regular-polygons-javascript-canvas

export const drawHexagon = input => {
  const {
    context,
    x,
    y,
    radius,
    fillStyle,
  } = input;

  const numberOfSides = 6;
 
  context.beginPath();
  context.moveTo(x +  radius * Math.cos(0), y +  radius * Math.sin(0));          
 
  for (let i = 1; i <= numberOfSides; i += 1) {
      context.lineTo(
        x + radius * Math.cos(i * 2 * Math.PI / numberOfSides),
        y + radius * Math.sin(i * 2 * Math.PI / numberOfSides)
      );
  }

  context.strokeStyle = fillStyle;
  context.lineWidth = 2;
  context.stroke();
  context.closePath();
};

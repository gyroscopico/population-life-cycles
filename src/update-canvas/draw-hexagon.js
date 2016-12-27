// See http://www.redblobgames.com/grids/hexagons/
import * as C from '../constants';

const hexCorner = (center, radius, i) => {
  const angleDeg = 60 * i + 30;
  const angleRad = angleDeg * Math.PI / 180;

  return {
    x: center.x + radius * Math.cos(angleRad),
    y: center.y + radius * Math.sin(angleRad),
  };
}

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
  let corner = hexCorner({x, y}, radius, 0);
  context.moveTo(corner.x, corner.y);
 
  for (let i = 1; i <= numberOfSides; i += 1) {
    corner = hexCorner({x, y}, radius, i);
    context.lineTo(corner.x, corner.y);
  }

  context.strokeStyle = fillStyle;
  context.lineWidth = C.HEXAGON_LINE_WIDTH;
  context.stroke();
  context.closePath();
};

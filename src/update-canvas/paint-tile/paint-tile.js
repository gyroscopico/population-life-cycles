import { drawHexagon } from '../draw-hexagon/draw-hexagon';

export const paintTile = (context, tile) => drawHexagon({
  context,
  x: tile.x,
  y: tile.y,
  radius: tile.radius,
  fillStyle: tile.color,
});

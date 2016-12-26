import { drawHexagon } from './draw-hexagon';

export const paintTile = (context, tile) => {
  tile.changed = false; // Changed to false to prevent repainting the same change.
  drawHexagon({
    context,
    x: tile.x,
    y: tile.y,
    radius: tile.radius,
    fillStyle: tile.color,
  });
};

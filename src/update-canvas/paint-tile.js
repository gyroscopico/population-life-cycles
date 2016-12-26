import { drawDisc } from './draw-disc';

export const paintTile = (context, tile) => {
  tile.changed = false; // Changed to false to prevent repainting the same change.
  drawDisc({
    context,
    x: tile.x,
    y: tile.y,
    radius: tile.radius,
    fillStyle: tile.color,
  });
};

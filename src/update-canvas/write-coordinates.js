import * as C from '../constants';

export const writeCoordinates = (context, tile) => {
  context.fillStyle = C.COLOR.BLACK;
  context.font = '16px Handlee';
  context.fillText(`${tile.coordinateX}:${tile.coordinateY}`, tile.x - 10, tile.y + 2.5);
};

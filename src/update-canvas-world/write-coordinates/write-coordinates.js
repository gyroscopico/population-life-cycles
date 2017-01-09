import * as C from '../../constants';
import { writeText } from '../write-text/write-text';

export const writeCoordinates = (context, tile) => writeText({
  context,
  color: C.COLOR.BLACK,
  fontSize: '9px',
  fontFamily: 'Handlee, cursive',
  text: `${tile.coordinateX}:${tile.coordinateY}`,
  x: tile.x - 10,
  y: tile.y + 2.5,
});

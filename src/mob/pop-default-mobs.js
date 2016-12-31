import * as C from '../constants';
import Faery from './faery/faery';

export const popDefaultMobs = (world) => {
  const mobs = [];

  const faery = new Faery({ world });

  mobs.push(faery);

  return mobs;
};

import { paintMob } from '../update-canvas-mobs/paint-mob/paint-mob';

export const updateCanvasCorpses = input => {
  const {
    context,
    corpses,
  } = input;

  // Paint corpses.
  corpses.map(corpse => paintMob(context, corpse, corpse.color));

  return context;
};

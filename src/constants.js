export const MALE = 'male';
export const FEMALE = 'female';
export const YOUNG = 'pawn';
export const ADULT = 'mob';

// Maximum age when mob is created by a player (not born from mobs).
export const MAX_CREATION_AGE = 3;

// Longevity is a range and dictates when a mob dies of old age.
export const MIN_MOB_LONGEVITY = 15;
export const MAX_MOB_LONGEVITY = 30;

// At what age does a young become an adult who can procreate?
export const MATURITY = 3;

// Cats default values vary from the standard mobs.
export const MIN_CAT_LONGEVITY = 4;
export const MAX_CAT_LONGEVITY = 17;
export const CAT_MATURITY = 1;

export const CATEGORY = {
  CAT: 'Cat',
  ORC: 'Orc',
  GOBLIN: 'Goblin',
};

export const ONE_TICK = 6 * 1e3; // 6 seconds of real time.
export const ONE_YEAR = 6 * 1e4;  // 1 minute of real time.
export const OLD_AGE = 'Old age';

export const AGE_INCREMENT = 1;

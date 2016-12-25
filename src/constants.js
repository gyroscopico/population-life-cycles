// Colour scheme. See scss too.
export const COLOR = {
  GOLD_L: '#FCCD5F',
  GOLD_M: '#E3B446',
  GOLD_D: '#C99A2C',

  GREEN_L: '#5FFCC5',
  GREEN_M: '#46E3AC',
  GREEN_D: '#2CC992',

  BLUE_L: '#5FC8FC',
  BLUE_M: '#46AFE3',
  BLUE_D: '#2C95C9',

  RED_L: '#FC5F5F',
  RED_M: '#E34646',
  RED_D: '#C92C2C',

  WHITE: '#F9F7ED',
  BLACK: '#33170D',
};

// Keys.
export const MALE = 'male';
export const FEMALE = 'female';
export const YOUNG = 'pawn';
export const ADULT = 'mob';

// Maximum age when mob is created by a player (not born from mobs).
export const MAX_CREATION_AGE = 9;

// Longevity is a range and dictates when a mob dies of old age.
export const MIN_MOB_LONGEVITY = 15;
export const MAX_MOB_LONGEVITY = 30;

// At what age does a young become an adult who can procreate?
export const MATURITY = 12;

// Cats default values vary from the standard mobs.
export const MIN_CAT_LONGEVITY = 4;
export const MAX_CAT_LONGEVITY = 17;
export const CAT_MATURITY = 2;
export const MAX_CAT_CREATION_AGE = 3;
export const YOUNG_CAT_SIZE = 4;
export const ADULT_CAT_SIZE = 6;  // young size of 4 * 1.5
export const ADULT_CAT_COLOR = COLOR.BLUE_D;

// Goblin default values vary from the standard mobs.
export const YOUNG_GOBLIN_SIZE = 8;
export const ADULT_GOBLIN_SIZE = 12;  // young size of 8 * 1.5
export const ADULT_GOBLIN_COLOR = COLOR.GREEN_D;

// Mob categories.
export const CATEGORY = {
  CAT: 'Cat',
  ORC: 'Orc',
  GOBLIN: 'Goblin',
};

// Animation time measurement (ex: mob movements, pop mobs on screen).
export const FRAME_RATE = 1e3 / 24; // 24 frames per second.

// Game logic time measurement (ex: ageing of mobs).
export const ONE_TICK = 6 * 1e3; // 6 seconds of real time.

// Causes of death.
export const OLD_AGE = 'old age';

export const AGE_INCREMENT = 1;

// List all error messages.
export const ERROR = {
  INVALID_NUMBER_OF_MOBS: 'Invalid number of mobs',
  UNEXPECTED_MOB_CATEGORY: 'Unexpected mob category',
};

// Default mob size when young or adult.
export const YOUNG_SIZE = 10;
export const ADULT_SIZE = 15; // young size of 10 * 1.5

// Default mob color when young or adult.
export const DEAD_COLOR = COLOR.WHITE;
export const YOUNG_COLOR = COLOR.RED_M;
export const ADULT_COLOR = COLOR.GOLD_D;

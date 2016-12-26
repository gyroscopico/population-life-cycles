// Colour scheme. See scss too.
export const COLOR = {
  GOLD_L: '#FFFFC5',
  GOLD_M: '#E3B446',
  GOLD_D: '#C99A2C',

  GREEN_L: '#C4FFCC',
  GREEN_M: '#5FFD67',
  GREEN_D: '#009701',

  BLUE_L: '#C5FFFF',
  BLUE_M: '#46AFE3',
  BLUE_D: '#2C95C9',

  RED_L: '#FFDEDE',
  RED_M: '#E34646',
  RED_D: '#C92C2C',

  PURPLE_L: '#FFC5FF',
  PURPLE_M: '#9C46E3',
  PURPLE_D: '#822CC9',

  PINK_L: '#FFE4FF',
  PINK_M: '#F265B0',
  PINK_D: '#D84B96',

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
export const MAX_MOB_LONGEVITY = 45;

// Age at which a young becomes an adult and can procreate.
export const MATURITY = 12;

// Cats default values vary from the standard mobs.
export const MIN_CAT_LONGEVITY = 4;
export const MAX_CAT_LONGEVITY = 17;
export const CAT_MATURITY = 2;
export const MAX_CAT_CREATION_AGE = 3;
export const YOUNG_CAT_SIZE = 2;
export const ADULT_CAT_SIZE = 3;  // young size * 1.5
export const DEAD_CAT_COLOR = COLOR.BLUE_L;
export const YOUNG_CAT_COLOR = COLOR.BLUE_M;
export const ADULT_CAT_COLOR = COLOR.BLUE_D;

// Goblin default values vary from the standard mobs.
export const YOUNG_GOBLIN_SIZE = 4;
export const ADULT_GOBLIN_SIZE = 6;  // young size * 1.5
export const DEAD_GOBLIN_COLOR = COLOR.GREEN_L;
export const YOUNG_GOBLIN_COLOR = COLOR.GREEN_M;
export const ADULT_GOBLIN_COLOR = COLOR.GREEN_D;

// Human default values.
export const MIN_HUMAN_LONGEVITY = 70;
export const MAX_HUMAN_LONGEVITY = 120;
export const DEAD_HUMAN_COLOR = COLOR.PINK_L;
export const YOUNG_HUMAN_COLOR = COLOR.PINK_M;
export const ADULT_HUMAN_COLOR = COLOR.PINK_D;

// Mob categories.
export const CATEGORY = {
  CAT: 'Cat',
  GOBLIN: 'Goblin',
  ORC: 'Orc',
  HUMAN: 'Human',
};

// Animation time measurement (ex: mob movements, pop mobs on screen).
export const FRAME_RATE = 1e3 / 24; // 24 frames per second.

// Game logic time measurement (ex: ageing of mobs).
export const ONE_TICK = 6 * 1e3; // 6 seconds of real time.

// Causes of death.
export const OLD_AGE = 'of old age';

export const AGE_INCREMENT = 1;

// List all error messages.
export const ERROR = {
  INVALID_NUMBER_OF_MOBS: 'Invalid number of mobs',
  UNEXPECTED_MOB_CATEGORY: 'Unexpected mob category',
  WORLD_IS_FULL: 'World is full',
};

// Default mob size when young or adult.
export const YOUNG_SIZE = 6;
export const ADULT_SIZE = 9; // young size * 1.5

// Default mob color when young or adult.
export const DEAD_COLOR = COLOR.GOLD_L;
export const YOUNG_COLOR = COLOR.GOLD_M;
export const ADULT_COLOR = COLOR.GOLD_D;

// World.
export const HEADER_HEIGHT = 49;

// World tiles.
export const TILE_SIZE = 30;
export const TILE_COLOR = COLOR.RED_L;

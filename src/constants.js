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

// Welcome message.
export const WELCOME = 'Welcome to Population Game. Influence this worlds population and observe its evolution.';

// Maximum number of messages that are logged.
export const LOG_MASTER_KEY = 'log';
export const MAX_LOG_MESSAGES = 9;

// Keys.
export const MALE = 'male';
export const FEMALE = 'female';
export const YOUNG = 'pawn';
export const ADULT = 'mob';

// Small size mobs.
export const SMALL_SIZE_YOUNG = 2;
export const SMALL_SIZE_ADULT = 3;

// Mob pop default values.
export const MIN_MOB_LONGEVITY = 15;
export const MAX_MOB_LONGEVITY = 45;
export const MATURITY = 12;
export const MAX_CREATION_AGE = 9;
export const YOUNG_SIZE = 6;
export const ADULT_SIZE = 9; // young size * 1.5
export const DEAD_COLOR = COLOR.GOLD_L;
export const YOUNG_COLOR = COLOR.GOLD_M;
export const ADULT_COLOR = COLOR.GOLD_D;
export const MOB_SPEED = 1;

// Cats pop default values.
export const MIN_CAT_LONGEVITY = 4;
export const MAX_CAT_LONGEVITY = 17;
export const CAT_MATURITY = 2;
export const MAX_CAT_CREATION_AGE = 3;
export const YOUNG_CAT_SIZE = SMALL_SIZE_YOUNG;
export const ADULT_CAT_SIZE = SMALL_SIZE_ADULT;
export const DEAD_CAT_COLOR = COLOR.BLUE_L;
export const YOUNG_CAT_COLOR = COLOR.BLUE_M;
export const ADULT_CAT_COLOR = COLOR.BLUE_D;

// Goblin pop default values.
export const YOUNG_GOBLIN_SIZE = 4;
export const ADULT_GOBLIN_SIZE = 6;  // young size * 1.5
export const DEAD_GOBLIN_COLOR = COLOR.GREEN_L;
export const YOUNG_GOBLIN_COLOR = COLOR.GREEN_M;
export const ADULT_GOBLIN_COLOR = COLOR.GREEN_D;

// Human pop default values.
export const MIN_HUMAN_LONGEVITY = 70;
export const MAX_HUMAN_LONGEVITY = 90;
export const DEAD_HUMAN_COLOR = COLOR.PINK_L;
export const YOUNG_HUMAN_COLOR = COLOR.PINK_M;
export const ADULT_HUMAN_COLOR = COLOR.PINK_D;

// Faery pop default value.
export const MIN_FAERY_LONGEVITY = 630;
export const MAX_FAERY_LONGEVITY = 810;
export const FAERY_MATURITY = 540;
export const MAX_FAERY_CREATION_AGE = 27;
export const YOUNG_FAERY_SIZE = SMALL_SIZE_YOUNG;
export const ADULT_FAERY_SIZE = SMALL_SIZE_ADULT;
export const YOUNG_FAERY_COLOR = COLOR.PURPLE_M;
export const ADULT_FAERY_COLOR = COLOR.PURPLE_D;
export const DEAD_FAERY_COLOR = COLOR.PURPLE_L;

// Mob categories.
export const CATEGORY = {
  FAERY: 'Faery',
  HUMAN: 'Human',
  ORC: 'Orc',
  GOBLIN: 'Goblin',
  CAT: 'Cat',
};

// Default mobs poped in the world.
export const DEFAULT_MOBS = {
  FAERY: 1,
  HUMAN: 2,
  ORC: 5,
  GOBLIN: 7,
  CAT: 11,
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
  INVALID_INPUT: 'Invalid input',
  LOCAL_STORAGE_NOT_SUPPORTED: 'localStorage is not supported.',
};

// World.
export const HEADER_HEIGHT = 49;
export const CONTROLS_WIDTH = 264;
export const CONTROLS_HEIGHT = 54;
export const SCROLLABLE_WINDOW_HEIGHT = 114;
export const HEXAGON_LINE_WIDTH = 1;

// World tiles.
export const TILE_SIZE = 30;
export const TILE_COLOR = COLOR.RED_L;

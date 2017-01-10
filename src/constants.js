export const DEBUG = true;

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
export const WELCOME = [
  'Welcome to Population Game.',
  'Influence this worlds population and observe its evolution.',
].join(' ');

// Flag if the world starts with a default population of mobs.
export const POP_DEFAULT_MOBS = false;

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
export const MOB_SPEED = 6;

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
export const CAT_SPEED = 8;

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
export const FAERY_SPEED = 12;

// Mob categories used for poping the right mob class.
export const CATEGORY = {
  DEFAULT: 'Orc',
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

// Canvas.
export const CANVAS_REFS = {
  WORLD: 'canvasWorld',
  CORPSES: 'canvasCorpses',
  MOBS: 'canvasMobs',
};

// Vectors relative from current tile to a range
// of concentric tiles around central one.
// Each mob position.coordinateX and .coordinateY
// are that central position.
export const VECTORS = {
  // Central tile Y coordinate is even (0, 2, 4...).
  EVEN_RANGES: [
    // Range is 0, i.e. no movement.
    [
      [0, 0],
    ],
    // Range is 1, circle of 6 possible tiles.
    [
      [1, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
      [-1, 1],
      [0, 1]
    ],
    // Range is 2, circle of 12 possible tiles.
    [
      [0, -2],
      [1, -2],
      [2, -1],
      [2, 0],
      [2, 1],
      [1, 2],
      [0, 2],
      [-1, 2],
      [-1, 1],
      [-2, 0],
      [-1, -1],
      [-1, -2],
    ],
    // Range is 3, circle of 18 possible tiles.
    [
      [0, -3],
      [1, -3],
      [2, -3],
      [2, -2],
      [3, -1],
      [3, 0],
      [3, 1],
      [2, 2],
      [2, 3],
      [1, 3],
      [0, 3],
      [-1, 3],
      [-2, 2],
      [-2, 1],
      [-3, 0],
      [-2, -1],
      [-2, -2],
      [-1, -3],
    ],
    // Range is 4, circle of 24 possible tiles.
    [
      [0, -4],
      [1, -4],
      [2, -4],
      [3, -3],
      [3, -2],
      [4, -1],
      [4, 0],
      [4, 1],
      [3, 2],
      [3, 3],
      [2, 4],
      [1, 4],
      [0, 4],
      [-1, 4],
      [-2, 4],
      [-2, 3],
      [-3, 2],
      [-3, 1],
      [-4, 0],
      [-3, -1],
      [-3, -2],
      [-2, -3],
      [-2, -4],
      [-1, -4],
    ],
  ],

  // Central tile Y coordinate is even (1, 3, 5...).
  ODD_RANGES: [
    // Range is 0, i.e. no movement.
    [
      [0, 0],
    ],
    // Range is 1, circle of 6 possible tiles.
    [
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, -1],
      [-1, 0],
      [0, 1]
    ],
    // Range is 2, circle of 12 possible tiles.
    [
      [0, -2],
      [1, -2],
      [1, -1],
      [2, 0],
      [1, 1],
      [1, 2],
      [0, 2],
      [-1, 2],
      [-2, 1],
      [-2, 0],
      [-2, -1],
      [-1, -2],
    ],
    // Range is 3, circle of 18 possible tiles.
    [
      [0, -3],
      [1, -3],
      [2, -2],
      [2, -1],
      [3, 0],
      [2, 1],
      [2, 2],
      [1, 3],
      [0, 3],
      [-1, 3],
      [-2, 3],
      [-2, 2],
      [-3, 1],
      [-3, 0],
      [-3, -1],
      [-2, -2],
      [-2, -3],
      [-1, -3],
    ],
    // Range is 4, circle of 24 possible tiles.
    [
      [0, -4],
      [1, -4],
      [2, -4],
      [2, -3],
      [3, -2],
      [3, -1],
      [4, 0],
      [3, 1],
      [3, 2],
      [2, 3],
      [2, 4],
      [1, 4],
      [0, 4],
      [-1, 4],
      [-2, 4],
      [-3, 3],
      [-3, 2],
      [-4, 1],
      [-4, 0],
      [-4, -1],
      [-3, -2],
      [-3, -3],
      [-2, -4],
      [-1, -4],
    ],
  ],
};

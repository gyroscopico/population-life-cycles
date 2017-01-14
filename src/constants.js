export const DEBUG = false;

// Colour scheme. See scss too.
export const COLOR = {
  GOLD_L: '#ffffc5',
  GOLD_M: '#e3b446',
  GOLD_D: '#c99a2c',

  GREEN_L: '#c4ffcc',
  GREEN_M: '#49b64e',
  GREEN_D: '#009701',

  BLUE_L: '#c5ffff',
  BLUE_M: '#46afe3',
  BLUE_D: '#2c95c9',

  RED_L: '#ffdede',
  RED_M: '#e34646',
  RED_D: '#c92c2c',

  PURPLE_L: '#ffc5ff',
  PURPLE_M: '#9c46e3',
  PURPLE_D: '#822cc9',

  PINK_L: '#ffe4ff',
  PINK_M: '#f265b0',
  PINK_D: '#d84b96',

  WHITE: '#f9f7ed',
  BLACK: '#33170d',
};

// Keys.
export const MALE = 'male';
export const FEMALE = 'female';
export const YOUNG = 'pawn';
export const ADULT = 'mob';

// Mob ranges.
export const RANGES = {
  NONE: 0,
  SHORT: 1,
  MEDIUM: 2,
  LONG: 3,
  MAXIMUM: 4,
};

// Young mob sizes.
export const YOUNG_SIZES = {
  SMALL: 2,
  MEDIUM: 4,
  LARGE: 6,
};

// Young to adult size: 1.5
const YOUNG_TO_ADULT = 1.5;

// Adult mob sizes.
export const ADULT_SIZES = {
  SMALL: YOUNG_SIZES.SMALL * YOUNG_TO_ADULT,
  MEDIUM: YOUNG_SIZES.MEDIUM * YOUNG_TO_ADULT,
  LARGE: YOUNG_SIZES.LARGE * YOUNG_TO_ADULT,
};

// Mob speeds.
export const SPEEDS = {
  SLOW: 6,
  AVERAGE: 8,
  FAST: 12,
};

// Mob pop default values.
export const MIN_MOB_LONGEVITY = 15;
export const MAX_MOB_LONGEVITY = 45;
export const MATURITY = 12;
export const MAX_CREATION_AGE = 9;
export const YOUNG_SIZE = YOUNG_SIZES.MEDIUM;
export const ADULT_SIZE = ADULT_SIZES.MEDIUM;
export const MOB_RANGE = RANGES.MEDIUM;
export const DEAD_COLOR = COLOR.GOLD_L;
export const YOUNG_COLOR = COLOR.GOLD_M;
export const ADULT_COLOR = COLOR.GOLD_D;
export const MOB_SPEED = SPEEDS.SLOW;

// Cats pop default values.
export const MIN_CAT_LONGEVITY = 4;
export const MAX_CAT_LONGEVITY = 17;
export const CAT_MATURITY = 2;
export const MAX_CAT_CREATION_AGE = 3;
export const YOUNG_CAT_SIZE = YOUNG_SIZES.SMALL;
export const ADULT_CAT_SIZE = ADULT_SIZES.SMALL;
export const DEAD_CAT_COLOR = COLOR.BLUE_L;
export const YOUNG_CAT_COLOR = COLOR.BLUE_M;
export const ADULT_CAT_COLOR = COLOR.BLUE_D;
export const CAT_SPEED = SPEEDS.AVERAGE;

// Goblin pop default values.
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
export const YOUNG_FAERY_SIZE = YOUNG_SIZES.SMALL;
export const ADULT_FAERY_SIZE = ADULT_SIZES.SMALL;
export const YOUNG_FAERY_COLOR = COLOR.PURPLE_M;
export const ADULT_FAERY_COLOR = COLOR.PURPLE_D;
export const DEAD_FAERY_COLOR = COLOR.PURPLE_L;
export const FAERY_SPEED = SPEEDS.FAST;

// Mob categories used for poping the right mob class.
export const CATEGORY = {
  DEFAULT: 'Orc',
  FAERY: 'Faery',
  HUMAN: 'Human',
  ORC: 'Orc',
  GOBLIN: 'Goblin',
  CAT: 'Cat',
};

// Game logic time measurement (ex: ageing of mobs or
// checking agro range).
export const LONG_TICK = 1e3 * 6; // 6 seconds of real time.
export const SHORT_TICK = 1e3; // 1 second of real time.

// Causes of death.
export const OLD_AGE = 'of old age';

export const AGE_INCREMENT = 1;

// List all error messages.
export const ERROR = {
  UNEXPECTED_MOB_CATEGORY: 'Unexpected mob category',
  WORLD_IS_FULL: 'World is full',
  INVALID_INPUT: 'Invalid input',
};

// UI.
export const HEADER_HEIGHT = 40;
export const CONTROLS_WIDTH = 264;
export const CONTROLS_HEIGHT = 40;
export const HEXAGON_LINE_WIDTH = 1;

// World tiles.
export const TILE_SIZE = 44;
export const TILE_COLOR = COLOR.RED_L;

// Canvas.
export const CANVAS_REFS = {
  WORLD: 'canvasWorld',
  CORPSES: 'canvasCorpses',
  MOBS: 'canvasMobs',
};

// Lists of things to track, like mates.
export const LIST = {
  MAX: 6,
};

// Number of mobs to pop with pop buttons.
export const MOBS_PER_POP = 1;

// Circle vectors relative from current tile to a range
// of concentric tiles around central one.
// Each mob position.coordinateX and .coordinateY
// are that central position.
export const CIRCLE_VECTORS = {
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

// Area Vectors, based on Circle Vectors, to calculate
// all tiles from a central one on a given range.
export const AREA_VECTORS = {
  EVEN_RANGES: [
    CIRCLE_VECTORS.EVEN_RANGES[0],
    CIRCLE_VECTORS.EVEN_RANGES[1],
    CIRCLE_VECTORS.EVEN_RANGES[1]
      .concat(CIRCLE_VECTORS.EVEN_RANGES[2]),
    CIRCLE_VECTORS.EVEN_RANGES[1]
      .concat(CIRCLE_VECTORS.EVEN_RANGES[2])
      .concat(CIRCLE_VECTORS.EVEN_RANGES[3]),
    CIRCLE_VECTORS.EVEN_RANGES[1]
      .concat(CIRCLE_VECTORS.EVEN_RANGES[2])
      .concat(CIRCLE_VECTORS.EVEN_RANGES[3])
      .concat(CIRCLE_VECTORS.EVEN_RANGES[4]),
  ],
  ODD_RANGES: [
    CIRCLE_VECTORS.ODD_RANGES[0],
    CIRCLE_VECTORS.ODD_RANGES[1],
    CIRCLE_VECTORS.ODD_RANGES[1]
      .concat(CIRCLE_VECTORS.ODD_RANGES[2]),
    CIRCLE_VECTORS.ODD_RANGES[1]
      .concat(CIRCLE_VECTORS.ODD_RANGES[2])
      .concat(CIRCLE_VECTORS.ODD_RANGES[3]),
    CIRCLE_VECTORS.ODD_RANGES[1]
      .concat(CIRCLE_VECTORS.ODD_RANGES[2])
      .concat(CIRCLE_VECTORS.ODD_RANGES[3])
      .concat(CIRCLE_VECTORS.ODD_RANGES[4]),
  ],
};

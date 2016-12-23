const log = [];
const numberMobsToAdd = document.getElementById('number-mobs-to-add');
const mobCategory = document.getElementById('mob-category');
const displayLog = document.getElementById('display-log');
const totalPopulation = document.getElementById('total-population');
const lastUpdate = document.getElementById('last-update');
const mobs = [];

const guid = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

const C = {
  MALE: 'male',
  FEMALE: 'female',
  YOUNG: 'pawn',
  ADULT: 'mob',

  // Maximum age when mob is created (not born).
  MAX_CREATION_AGE: 3,

  MIN_MOB_LONGEVITY: 4,
  MAX_MOB_LONGEVITY: 17,
  MIN_ORC_LONGEVITY: 15,
  MAX_ORC_LONGEVITY: 30,
  CATEGORY: {
    CAT: 'Cat',
    ORC: 'Orc',
  },
  ONE_TICK: 6000, // 6 seconds (or 6 thousand milliseconds).
}

class Mob {
  constructor(input) {
    // Assign all inputs as properties (if any).
    Object.assign(this, input);

    this.id = guid();
    this.gender = this.gender || this.randomGender();

    // Was this mob spawned by a player?
    // Note: Object.assign can give a value, if not default to true.
    this.isCreated = this.isCreated || true;

    // Is this mob born from other mobs?
    this.isBornFromMobs = this.isBornFromMobs || false;

    // A newborn mob from existing mobs who procreated is always 0 years of age.
    this.age = this.isBornFromMobs ? 0 : this.randomNumber(0, this.maxCreationAge());

    this.created = Date.now();
    this.longevity = this.randomNumber(this.minLongevity(), this.maxLongevity());
    this.category = this.getCategory();

    this.updateLog();
  }

  young() {
    return C.YOUNG;
  }

  adult() {
    return C.ADULT;
  }

  maxCreationAge() {
    return C.MAX_CREATION_AGE;
  }

  minLongevity() {
    return C.MIN_MOB_LONGEVITY;
  }

  maxLongevity() {
    return C.MAX_MOB_LONGEVITY;
  }

  // Random integer number included in a range from min to max (both inclusive).
  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randomGender() {
    return this.randomNumber(0, 9) >= 5 ? C.MALE : C.FEMALE;
  }

  isAlive() {
    return this.age < this.longevity;
  }

  canProcreate() {
    return this.age > 1 && this.isAlive();
  }

  canBecomePregnant() {
    return this.gender === C.FEMALE && this.canProcreate();
  }

  getCategory() {
    return this.age < 1 ? this.young() : this.adult();
  }

  updateLog() {
    const age = this.age > 0 ? `${this.age} ${this.age > 1 ? 'years' : 'year'} old` : 'newborn';
    updateLog(`Pop ${this.gender} ${this.category} (${age}, \u2625${this.longevity}).`);
  }
}

class Cat extends Mob {
  young() {
    return 'kitten';
  }

  adult() {
    return 'cat';
  }
}

class Orc extends Mob {
  young() {
    return 'orc pawn';
  }

  adult() {
    return 'orc';
  }

  minLongevity() {
    return C.MIN_ORC_LONGEVITY;
  }

  maxLongevity() {
    return C.MAX_ORC_LONGEVITY;
  }
}

const ageMobs = () => {
  // todo: implement aging all mobs by one year and possibly killing them of old age?
}

const updateUI = () => {
  totalPopulation.textContent = mobs.length.toString();
  lastUpdate.textContent = new Date().toLocaleString('fr');
}

// Called every "tick", see C.ONE_TICK for this length of time.
const updateGame = () => {
  updateLog(`One world tick has fired: ${new Date().toLocaleString('fr')}.`);
  updateUI();
  ageMobs();
}

const scrollToBottom = element => {
  element.scrollTop = element.scrollHeight;
}

// Heartbeat runs faster than the ticks and guarentees
// an animation consistent with as smooth a framerate as possible.
let lastTime = undefined;
let tick = undefined;
const heartbeat = currentTime => {
  window.requestAnimationFrame(heartbeat);

  // Delta is amount of time since last heartbeat,
  // which can be fast depending on the client.
  const delta = lastTime === undefined ? 0 : currentTime - lastTime;
  lastTime = currentTime;

  // Update the game every tick (regular intervals),
  // not every heartbeat (too fast and varies based on client).
  if (tick === undefined || tick >= C.ONE_TICK) {
    // The heartbeat is not allowed to make any game update
    // or any DOM operation, only other functions called by updateGame can.
    updateGame();
    tick = 0; // Reset the tick.
  }

  // todo: create a separate, faster "tick" for animations (250 milliseconds, i.e. .25 of a second?)
  // like objects moving, camera controls or handling keyboard input.

  // note: for an animation, movements should be related to the delta.
  // see http://creativejs.com/resources/requestanimationframe/

  // Increment the tick by the delta.
  tick = tick + delta;
};

const updateLog = message => {
  log.push(message);
  const li = document.createElement('li');
  const text = document.createTextNode(message);
  li.appendChild(text);
  displayLog.appendChild(li);
  scrollToBottom(displayLog);
}

const addMobs = event => {
  event.preventDefault();

  const toAdd = Number(numberMobsToAdd.value);
  const category = mobCategory.value;

  if (!toAdd ||  toAdd === 0) {
    throw new Error(`Invalid number of mobs to add: ${toAdd}.`);
  }

  if (!category) {
    throw new Error(`Invalid mob category: ${category}.`);
  }

  for (let i = 0; i < toAdd; i++) {
    switch (category) {
      case C.CATEGORY.CAT:
        mobs.push(new Cat());
        break;
      case C.CATEGORY.ORC:
        mobs.push(new Orc());
        break;
      default:
        throw new Error(`Unexpected mob category: ${category}.`);
    }
  }
};

const addMobsButton = document.getElementById('add-mobs');
addMobsButton.addEventListener('click', addMobs, false);

// Start the heartbeat.
heartbeat();

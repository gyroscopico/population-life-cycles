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

const updateGame = () => {
  const updated = new Date().toLocaleString('fr');
  updateLog(`game is updated ${updated}.`);

  totalPopulation.textContent = mobs.length.toString();
  lastUpdate.textContent = updated;
}

// Called every "tick", i.e. every 6 seconds.
let time;
const heartbeat = () => {
  window.requestAnimationFrame(heartbeat);

  const now = new Date().getTime();
  const delta = now - (time || now);
  time = now;

  console.log(delta);

  /*if (delta > 30) {
    updateGame();
  }*/
};

const updateLog = message => {
  log.push(message);
  const li = document.createElement('li');
  const text = document.createTextNode(message);
  li.appendChild(text);
  displayLog.appendChild(li);
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

# population-life-cycles
Population life cycles simulates adding a group of individuals that will reproduce, grow old and die.

## Install

```
npm install
```

## Build only once

```
npm run build
```

## Run locally

```
npm start
```

Browse to http://localhost:8080 or whichever port is available.

## Develop and build continuously

```
npm run dev
```

## Linting and testing

```
npm test
```

## Deploy to production

Publish any changes to the gh-pages branch and browse to https://ebabel-eu.github.io/population-life-cycles/

## Todo tasks

### Must have tasks

- mobs not spawning on top of each other (world with available or taken coordinates?).
- mobs moving around (no collision).
- mobs procreate when they are close, the female mob becomes pregnant and eventually gives birth to a number of youngs.

### Low priority tasks

- automated testing (unit test, test coverage, end to end with web driver).
- debounce and redefine the size of the canvas when window is resized.
- gzip the bundle with https://www.npmjs.com/package/compression-webpack-plugin
- responsive canvas (not using css though).
- how do I navigate a world that is bigger than the viewport?
- corpse decay; after a while, the corpses disappear off the game (including from the corpse array).
- log; older log messages should be removed from the web UI to save memory. Possibly archive them in localStorage but never delete data from everywhere.
- use localStorage to get some persistence locally in the browser and load previous data.
- use online data store like https://firebase.google.com/ to store data.

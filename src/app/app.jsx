import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

import * as C from '../constants';
import { popMobs } from '../mob/pop-mobs';
import { ageMobs } from '../mob/age-mobs';
import { scrollToBottom } from '../utils/scroll-to-bottom';
import { updateCanvasWorld } from '../update-canvas-world/update-canvas-world';
import { updateCanvasCorpses }
  from '../update-canvas-corpses/update-canvas-corpses';
import { updateCanvasMobs } from '../update-canvas-mobs/update-canvas-mobs';
import World from '../world/world';
import Storage from '../storage/storage';
import { now } from '../utils/now';
import GameCanvas from '../game-canvas/game-canvas';
import { updateMatesList } from '../mob/update-mates-list/update-mates-list';
import './app.scss';

// Main starting point of the game.
export default class App extends Component {
  componentWillMount() {
    const welcome = `${C.WELCOME} ${now()}`;
    const world = new World({ window });

    // Keep track of all log messages.
    this.setState({
      // Mobs that are currently alive.
      mobs: [],

      // Mobs that used to be alive but are now dead.
      corpses: [],

      // World models all environment parameters (not mobs).
      world,

      // In heartbeat, longTick measures if enough time
      // has elapsed since the last longTick.
      longTick: 0,

      shortTick: 0,

      // Keep track of all messages that should be logged and displayed.
      log: [welcome],
    });

    // Persist the welcome message in log.
    const logStorage = new Storage({ masterKey: C.LOG_MASTER_KEY });
    logStorage.setItem(welcome);

    // Log the welcome message of the day in Google Analytics.
    ga('send', 'event', 'Log', 'MOTD', welcome);

    // Functions of the game.
    this.heartbeat = this.heartbeat.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    this.heartbeat(); // Start the heartbeat.

    if (!this.refs[C.CANVAS_REFS.WORLD]) {
      return;
    }

    const width = this.state.world.width;
    const height = this.state.world.height;

    this.contextWorld = new GameCanvas({
      ref: C.CANVAS_REFS.WORLD,
      refs: this.refs,
      width,
      height,
    }).context;

    this.contextCorpses = new GameCanvas({
      ref: C.CANVAS_REFS.CORPSES,
      refs: this.refs,
      width,
      height,
    }).context;

    this.contextMobs = new GameCanvas({
      ref: C.CANVAS_REFS.MOBS,
      refs: this.refs,
      width,
      height,
    }).context;

    updateCanvasWorld({
      context: this.contextWorld,
      world: this.state.world,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // Has log changed?
    if (this.state.log.length !== prevState.log.length) {
      scrollToBottom(this.refs.logWindow);
    }
  }

  // Called every "shortTick" see C.SHORT_TICK.
  updateShortTickGameLogic() {
    // Update each mob list of mobs he/she wants to mate with.
    updateMatesList({
      world: this.state.world,
      mobs: this.state.mobs,
    });
  }

  // Called every "longTick", see C.LONG_TICK for how frequent this is.
  updateLongTickGameLogic() {
    // Age all mobs by 1 year, returns both the mobs and the corpses.
    const ageingResult = ageMobs(
      this.contextMobs,
      this.state.mobs,
      this.state.corpses,
      this.state.world,
      C.AGE_INCREMENT,
    );

    // Update state for all mobs, world, corpses and log.
    this.setState({
      mobs: ageingResult.mobs,
      corpses: ageingResult.corpses,
      world: ageingResult.world,
      log: this.state.log
          .concat(ageingResult.log)
          .splice(-C.MAX_LOG_MESSAGES),
    });

    updateCanvasCorpses({
      context: this.contextCorpses,
      corpses: ageingResult.corpses,
    });
  }

  // Update the visual virtual world on the 2D canvas.
  updateAnimation(delta) {
    updateCanvasMobs({
      context: this.contextMobs,
      world: this.state.world,
      mobs: this.state.mobs,
      delta,
    });
  }

  // Heartbeat runs faster than the long ticks and guarantees
  // an animation consistent regardless of the device physical framerate.
  heartbeat(currentTime) {
    if (window && window.requestAnimationFrame) {
      window.requestAnimationFrame(this.heartbeat);
    }

    // Delta is amount of time since last heartbeat,
    // which can be fast depending on the client.
    const delta = this.lastTime === undefined ?
      0 :
      currentTime - this.lastTime;
    this.lastTime = currentTime;

    // Update the game every longTick (regular intervals),
    // not every heartbeat (too fast and varies based on client).
    if (this.state.longTick >= C.LONG_TICK) {
      // The heartbeat is not allowed to make any game update
      // or any DOM operation, only other functions called by
      // updateLongTickGameLogic, updateShortTickGameLogic or
      // updateAnimation can.
      this.updateLongTickGameLogic();
      this.setState({
        longTick: 0,  // Reset the longTick.
      });
    }

    if (this.state.shortTick >= C.SHORT_TICK) {
      this.updateShortTickGameLogic();
      this.setState({
        shortTick: 0,
      });
    }

    // Movements are related to the requestAnimationFrame delta.
    this.updateAnimation(delta);

    // Increment the game shortTick and longTick.
    this.setState({
      shortTick: this.state.shortTick + delta,
      longTick: this.state.longTick + delta,
    });
  }

  submitForm(category, event) {
    // Validate the number of mobs to add.
    const toAdd = Number(this.refs['number-mobs-to-add'].value);
    let errorMessage;

    if (!toAdd || isNaN(toAdd) || toAdd > 100 || toAdd < 0) {
      errorMessage = `${C.ERROR.INVALID_NUMBER_OF_MOBS}: ${toAdd}.`;
      ga('send', 'event', 'Error', 'app.jsx', errorMessage);
      throw new Error(errorMessage);
    }

    // Validate the category of the mobs to add.
    if (!category) {
      errorMessage = `${C.ERROR.UNEXPECTED_MOB_CATEGORY}: ${category}.`;
      ga('send', 'event', 'Error', 'app.jsx', errorMessage);
      throw new Error(errorMessage);
    }

    const input = {
      toAdd,
      category,
      world: this.state.world,
    };

    // Add a given number of mobs.
    const newMobs = popMobs(event, input);

    this.setState({
      mobs: this.state.mobs.concat(newMobs.mobs),
      world: newMobs.world,
      log: this.state.log
          .concat(newMobs.log)
          .splice(- C.MAX_LOG_MESSAGES),
    });
  }

  render() {
    let key = 0;
    const logMessages = this.state.log.map(message => {
      key = key + 1;
      return <li key={key}>{message}</li>;
    });

    const mobsTotal = this.state.mobs && this.state.mobs.length || 0;
    const corpsesTotal = this.state.corpses && this.state.corpses.length || 0;
    const mobsLabel = mobsTotal > 1 ? 'mobs' : 'mob';
    const corpsesLabel = corpsesTotal > 1 ? 'corpses' : 'corpse';

    return (
      <div>
        <canvas className="canvas canvas-world" ref="canvasWorld" />
        <canvas className="canvas canvas-corpses" ref="canvasCorpses" />
        <canvas className="canvas canvas-mobs" ref="canvasMobs" />

        <ul className="header">
          <li><h1>Population Game</h1></li>
          <li>
            <span className="total-mobs big-number">
              {mobsTotal.toString()}
            </span> {mobsLabel}
          </li>
          <li>
            <span className="total-corpses big-number">
              {corpsesTotal.toString()}
            </span> {corpsesLabel}
          </li>
        </ul>

        <form
          className="main-controls"
          action="#"
          onSubmit={event => this.submitForm(C.CATEGORY.DEFAULT, event)}
        >
          <input
            type="number"
            ref="number-mobs-to-add"
            className="number-mobs-to-add"
            defaultValue="9"
            min="1"
            max="100"
            pattern="\d*"
          />
          <button
            className="pop-mob pop-orc"
            onClick={event => this.submitForm(C.CATEGORY.ORC, event)}
          >
            Orc
          </button>
          <button
            className="pop-mob pop-goblin"
            onClick={event => this.submitForm(C.CATEGORY.GOBLIN, event)}
          >
            Gob
          </button>
          <button
            className="pop-mob pop-cat"
            onClick={event => this.submitForm(C.CATEGORY.CAT, event)}
          >
            Cat
          </button>
          <button
            className="pop-mob pop-human"
            onClick={event => this.submitForm(C.CATEGORY.HUMAN, event)}
          >
            Man
          </button>
          <button
            className="pop-mob pop-faery pop-mob-last"
            onClick={event => this.submitForm(C.CATEGORY.FAERY, event)}
          >
            Fae
          </button>
        </form>

        <ol className="scrollable-window" ref="logWindow">
          {logMessages}
        </ol>
      </div>
    );
  }
}

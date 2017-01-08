import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

import * as C from '../constants';
import { popMobs } from '../mob/pop-mobs';
import { ageMobs } from '../mob/age-mobs';
import { scrollToBottom } from '../utils/scroll-to-bottom';
import { updateCanvasWorld } from '../update-canvas-world/update-canvas-world';
import { updateCanvasCorpses }
  from '../update-canvas-corpses/update-canvas-corpses';
import { updateCanvasMobs } from '../update-canvas-mobs/update-canvas-mobs';
import { popDefaultMobs } from '../mob/pop-default-mobs';
import World from '../world/world';
import Storage from '../storage/storage';
import { now } from '../utils/now';
import GameCanvas from '../game-canvas/game-canvas';
import './app.scss';

// Main starting point of the game.
export default class App extends Component {
  componentWillMount() {
    const welcome = `[motd] ${C.WELCOME} ${now()}`;

    const world = new World({ window });
    const mobs = C.POP_DEFAULT_MOBS ? popDefaultMobs(world) : [];

    // Keep track of all log messages.
    this.setState({
      // Mobs that are currently alive.
      mobs,

      // Mobs that used to be alive but are now dead.
      corpses: [],

      // World models all environment parameters (not mobs).
      world,

      // In heartbeat, lastTime keeps track of
      // the last time the function was run.
      lastTime: undefined,

      // In heartbeat, tick measures if enough time
      // has elapsed since the last tick.
      tick: 0,

      // In heartbeat, frame rate measures of enough time
      // has elapsed since the last frame
      // for a smooth animation (ex: 24 frames per second).
      frameRate: 0,

      // Keep track of all messages that should be logged and displayed.
      log: [welcome],
    });

    // Persist the welcome message in log.
    const logStorage = new Storage({ masterKey: C.LOG_MASTER_KEY });
    logStorage.setItem(welcome);

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

  // Called every "tick", see C.ONE_TICK for this length of time.
  updateGameLogic() {
    // Age all mobs by 1 year, returns both the mobs and the corpses.
    const ageingResult = ageMobs(
      this.state.mobs, this.state.corpses, this.state.world, C.AGE_INCREMENT);
    const mobs = ageingResult.mobs;
    const corpses = ageingResult.corpses;
    const world = ageingResult.world;
    const log = ageingResult.log;

    // Update state for all mobs, world, corpses and log.
    this.setState({
      mobs,
      corpses,
      world,
      log: this.state.log
          .concat(log)
          .splice(- C.MAX_LOG_MESSAGES),
    });

    updateCanvasCorpses({
      context: this.contextCorpses,
      corpses,
    });
  }

  // Update the visual virtual world on the 2D canvas.
  // Note: called 24 times per second, as per the constant C.FRAME_RATE
  updateAnimation() {
    updateCanvasMobs({
      context: this.contextMobs,
      world: this.state.world,
      mobs: this.state.mobs,
    });
  }

  // Heartbeat runs faster than the ticks and guarantees
  // an animation consistent with as smooth a framerate as possible.
  heartbeat(currentTime) {
    if (window && window.requestAnimationFrame) {
      window.requestAnimationFrame(this.heartbeat);
    }

    // Delta is amount of time since last heartbeat,
    // which can be fast depending on the client.
    const delta = this.state.lastTime === undefined ?
      0 :
      currentTime - this.state.lastTime;
    this.setState({
      lastTime: currentTime,
    });

    // Update the game every tick (regular intervals),
    // not every heartbeat (too fast and varies based on client).
    if (this.state.tick >= C.ONE_TICK) {
      // The heartbeat is not allowed to make any game update
      // or any DOM operation, only other functions called by
      // updateGameLogic or updateAnimation can.
      this.updateGameLogic();
      this.setState({
        tick: 0,  // Reset the tick.
      });
    }

    // Frame rate is used for moving sprites, camera controls or
    // handling keyboard input.
    // Note: for an animation, movements should be related to the delta.
    // See http://creativejs.com/resources/requestanimationframe/
    if (this.state.frameRate >= C.FRAME_RATE) {
      this.updateAnimation();
      this.setState({
        frameRate: 0, // Reset the frame rate.
      });
    }

    // Increment the tick and frame rate by the delta.
    this.setState({
      tick: this.state.tick + delta,
      frameRate: this.state.frameRate + delta,
    });
  }

  submitForm(category, event) {
    // Validate the number of mobs to add.
    const toAdd = Number(this.refs['number-mobs-to-add'].value);
    if (!toAdd || isNaN(toAdd) || toAdd > 100 || toAdd < 0) {
      throw new Error(`${C.ERROR.INVALID_NUMBER_OF_MOBS}: ${toAdd}.`);
    }

    // Validate the category of the mobs to add.
    if (!category) {
      throw new Error(`${C.ERROR.UNEXPECTED_MOB_CATEGORY}: ${category}.`);
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

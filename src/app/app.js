import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

import * as C from '../constants';
import { now } from '../utils/now';
import { ageMobs } from '../mob/age-mobs';
import { addMobs } from '../mob/add-mobs';
import { scrollToBottom } from '../utils/scroll-to-bottom';
import { updateCanvas } from '../update-canvas/update-canvas';
import './app.scss';

// Main starting point of the game.
export default class App extends Component {
  componentWillMount() {
    // Keep track of all log messages.
    this.setState({
      // Mobs that are currently alive.
      mobs: [],

      // Mobs that used to be alive but are now dead.
      corpses: [],

      // In heartbeat, lastTime keeps track of the last time the function was run.
      lastTime: undefined,

      // In heartbeat, tick measures if enough time has elapsed since the last tick.
      tick: 0,

      // In heartbeat, frame rate measures of enough time has elapsed since the last frame
      // for a smooth animation (ex: 24 frames per second).
      frameRate: 0,

      // Keep track of all messages that should be logged and displayed.
      log: [],

      // Flag the game world has just started ticking.
      isFirstInstant: true,
    });

    // Functions of the game.
    this.heartbeat = this.heartbeat.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    this.heartbeat(); // Start the heartbeat.

    this.context = this.refs.canvas.getContext('2d');
  }

  componentDidUpdate(prevProps, prevState) {
    // Has log changed?
    if (this.state.log.length !== prevState.log.length) {
      scrollToBottom(this.refs.logWindow);
    }
  }

  // Called every "tick", see C.ONE_TICK for this length of time.
  updateGameLogic() {
    // Log another tick in the world.
    this.updateLog(`[world-tick] ${now()}.`);

    // Age all mobs by 1 year, returns both the mobs and the corpses.
    let population = {
      mobs: this.state.mobs,
      corpses: this.state.corpses,
    };

    // All mobs are getting older.
    population = ageMobs(population, C.AGE_INCREMENT);
    this.setState({
      mobs: population.mobs,
      corpses: population.corpses,
      log: this.state.log.concat(population.log),
    });
  }

  updateLog(message) {
    this.setState({
      log: this.state.log.concat(message),
    })
  }

  // Update the visual virtual world on the 2D canvas.
  // Note: called 24 times per second, as per the constant C.FRAME_RATE
  updateAnimation() {
    updateCanvas({
      canvas: this.refs.canvas,
      context: this.context,
      mobs: this.state.mobs,
      corpses: this.state.corpses,
    });
  }

  // Heartbeat runs faster than the ticks and guarentees
  // an animation consistent with as smooth a framerate as possible.
  heartbeat(currentTime) {
    window.requestAnimationFrame(this.heartbeat);

    // Delta is amount of time since last heartbeat,
    // which can be fast depending on the client.
    const delta = this.state.lastTime === undefined ? 0 : currentTime - this.state.lastTime;
    this.setState({
      lastTime: currentTime,
    })

    // First instant tick.
    if (this.state.isFirstInstant) {
      this.updateLog(`[world-tick] ${now()}.`);
      this.setState({
        isFirstInstant: false,
      });
    }

    // Update the game every tick (regular intervals),
    // not every heartbeat (too fast and varies based on client).
    if (this.state.tick >= C.ONE_TICK) {
      // The heartbeat is not allowed to make any game update
      // or any DOM operation, only other functions called by updateGameLogic or updateAnimation can.
      this.updateGameLogic();
      this.setState({
        tick: 0,  // Reset the tick.
      });
    }

    // Frame rate is used for moving sprites, camera controls or handling keyboard input.
    // Note: for an animation, movements should be related to the delta.
    // See http://creativejs.com/resources/requestanimationframe/
    if (this.state.frameRate >= C.FRAME_RATE) {
      this.updateAnimation();
      this.setState({
        frameRate: 0, // Reset the frame rate.
      })
    }

    // Increment the tick and frame rate by the delta.
    this.setState({
      tick: this.state.tick + delta,
      frameRate: this.state.frameRate + delta,
    });
  }

  submitForm(event) {
    // Validate the number of mobs to add.
    const toAdd = Number(event.currentTarget['number-mobs-to-add'].value);
    if (!toAdd || isNaN(toAdd) || toAdd > 100 || toAdd < 0) {
      throw new Error(`${C.ERROR.INVALID_NUMBER_OF_MOBS}: ${toAdd}.`);
    }

    // Validate the category of the mobs to add.
    const category = event.currentTarget['mob-category'].value
    if (!category) {
      throw new Error(`${C.ERROR.UNEXPECTED_MOB_CATEGORY}: ${category}.`);
    }

    const input = {
      toAdd,
      category,
    };

    // Add a given number of mobs.
    const newMobs = addMobs(event, input);

    this.setState({
      mobs: this.state.mobs.concat(newMobs.mobs),
      log: this.state.log.concat(newMobs.log),
    });
  }

  render() {
    let key = 0;
    const logMessages = this.state.log.map(message => {
      key = key + 1;
      return <li key={key}>{message}</li>
    });

    const mobsLabel = this.state.mobs.length > 1 ? 'mobs' : 'mob';
    const corpsesLabel = this.state.corpses.length > 1 ? 'corpses' : 'corpse';

    return (
      <div>
        <canvas
          id="canvas" ref="canvas"
          className="center"
          width="300" height="300"
        />
        <form id="main-controls" action="#" onSubmit={this.submitForm}>
          <input type="number" id="number-mobs-to-add" defaultValue="1" min="1" max="100" />
          <select name="mob-category" id="mob-category">
            <option value="Cat">Cats</option>
            <option value="Orc">Orcs</option>
            <option value="Goblin">Goblins</option>
          </select>
          <input type="submit" value="Add" />
        </form>

        <ul id="header" className="horizontal">
          <li><h1>Population Game</h1></li>
          <li>
            <span id="total-mobs" className="big-number">
              {this.state.mobs.length.toString()}
            </span> {mobsLabel}
          </li>
          <li>
            <span id="total-corpses" className="big-number">
              {this.state.corpses.length.toString()}
            </span> {corpsesLabel}
          </li>
        </ul>

        <ol className="scrollable-window" ref="logWindow">
          {logMessages}
        </ol>
      </div>
    );
  }
}

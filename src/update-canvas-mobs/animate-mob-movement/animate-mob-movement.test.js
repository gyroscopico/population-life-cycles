import { animateMobMovement } from './animate-mob-movement';

test(`animateMobMovement moves a mob down.`, () => {
  // Mock mob.
  const mob = {
    position: {
      y: 30,
      x: 10,
      coordinateY: 2,
      coordinateX: 1,
    },
    destination: {
      y: 70,
      x: 10,
      coordinateY: 4,
      coordinateX: 1,
    },
    speed: 8,
  };

  const delta = 32;

  const result = animateMobMovement(mob, delta);

  expect(result.position.y).toBe(30.25);
  expect(result.position.x).toBe(10);
});

test(`animateMobMovement moves a mob up.`, () => {
  // Mock mob.
  const mob = {
    position: {
      y: 70,
      x: 10,
      coordinateY: 4,
      coordinateX: 1,
    },
    destination: {
      y: 30,
      x: 10,
      coordinateY: 2,
      coordinateX: 1,
    },
    speed: 8,
  };

  const delta = 16;

  const result = animateMobMovement(mob, delta);

  expect(result.position.y).toBe(69.5);
  expect(result.position.x).toBe(10);
});

test(`animateMobMovement moves a mob left.`, () => {
  // Mock mob.
  const mob = {
    position: {
      y: 30,
      x: 10,
      coordinateY: 2,
      coordinateX: 1,
    },
    destination: {
      y: 30,
      x: 0,
      coordinateY: 2,
      coordinateX: 0,
    },
    speed: 8,
  };

  const delta = 32;

  const result = animateMobMovement(mob, delta);

  expect(result.position.y).toBe(30);
  expect(result.position.x).toBe(9.75);
});

test(`animateMobMovement moves a mob right.`, () => {
  // Mock mob.
  const mob = {
    position: {
      y: 30,
      x: 0,
      coordinateY: 2,
      coordinateX: 0,
    },
    destination: {
      y: 30,
      x: 10,
      coordinateY: 2,
      coordinateX: 1,
    },
    speed: 8,
  };

  const delta = 32;

  const result = animateMobMovement(mob, delta);

  expect(result.position.y).toBe(30);
  expect(result.position.x).toBe(0.25);
});

test(`animateMobMovement sets arrivedAtDestination to true
    when the mob has arrived at its destination.`, () => {
  // Mock mob.
  const mob = {
    position: {
      y: 30,
      x: 10,
      coordinateY: 2,
      coordinateX: 0,
    },
    destination: {
      y: 30,
      x: 10,
      coordinateY: 2,
      coordinateX: 1,
    },
    speed: 8,
  };

  const delta = 32;

  const result = animateMobMovement(mob, delta);

  expect(result.arrivedAtDestination).toBe(true);
});

test(`animateMobMovement sets position coordinates to
    destination coordinates when the mob has arrived
    at its destination.`, () => {
  // Mock mob.
  const mob = {
    position: {
      y: 30,
      x: 10,
      coordinateY: 2,
      coordinateX: 0,
    },
    destination: {
      y: 30,
      x: 10,
      coordinateY: 2,
      coordinateX: 1,
    },
    speed: 8,
  };

  const delta = 32;

  const result = animateMobMovement(mob, delta);

  expect(result.position.coordinateX).toBe(1);
});

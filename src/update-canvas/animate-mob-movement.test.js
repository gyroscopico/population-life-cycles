import { animateMobMovement } from './animate-mob-movement';

test(`animateMobMovement moves a mob down towards his
    destination on the y axis by 1 pixel.`, () => {
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
    speed: 1,
  };

  const result = animateMobMovement(mob);

  expect(result.position.y).toBe(31);
  expect(result.position.x).toBe(10);
});

test(`animateMobMovement moves a mob up towards his
    destination on the y axis by 2 pixel.`, () => {
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
    speed: 2,
  };

  const result = animateMobMovement(mob);

  expect(result.position.y).toBe(68);
  expect(result.position.x).toBe(10);
});

test(`animateMobMovement moves a mob left towards his
    destination on the x axis by 1 pixel.`, () => {
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
    speed: 1,
  };

  const result = animateMobMovement(mob);

  expect(result.position.y).toBe(30);
  expect(result.position.x).toBe(9);
});

test(`animateMobMovement moves a mob right towards his
    destination on the x axis by 1 pixel.`, () => {
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
    speed: 1,
  };

  const result = animateMobMovement(mob);

  expect(result.position.y).toBe(30);
  expect(result.position.x).toBe(1);
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
    speed: 1,
  };

  const result = animateMobMovement(mob);

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
    speed: 1,
  };

  const result = animateMobMovement(mob);

  expect(result.position.coordinateX).toBe(1);
});

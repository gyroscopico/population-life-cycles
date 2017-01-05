import World from '../../world/world';
import Orc from './orc';

const world = new World({
  innerWidth: 50,
  innerHeight: 50,
});

test('Orc mob is an adult when age is set to 25', () => {
  const orc = new Orc({
    age: 25,
    world,
  });

  const result = orc.category;

  expect(result).toBe('orc');
});

test('Orc mob is a pawn when age is set to 5', () => {
  const orc = new Orc({
    age: 5,
    world,
  });

  const result = orc.category;

  expect(result).toBe('orc pawn');
});

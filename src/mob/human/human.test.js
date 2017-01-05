import World from '../../world/world';
import Human from './human';

const world = new World({
  innerWidth: 50,
  innerHeight: 50,
});

test('Human mob is an adult when age is set to 32', () => {
  const human = new Human({
    age: 32,
    world,
  });

  const result = human.category;

  expect(result).toBe('human');
});

test('Human mob is a child when age is set to 3', () => {
  const human = new Human({
    age: 3,
    world,
  });

  const result = human.category;

  expect(result).toBe('human child');
});

test('Human mob colour is set to the dead one when he is very old', () => {
  const human = new Human({
    age: 72,
    world,
  });

  human.becomeOlder(20);

  const result = human.color;

  expect(result).toBe('#FFE4FF');
});

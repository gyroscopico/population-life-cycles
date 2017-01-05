import Orc from './orc';

test('Orc mob is an adult when age is set to 25', () => {
  // Mock world object.
  const world = {
    tiles: [[{}, {}], [{}, {}]],
  };

  const orc = new Orc({
    age: 25,
    world,
  });

  const result = orc.adult();

  expect(result).toBe('orc');
});

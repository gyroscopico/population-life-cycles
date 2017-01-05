import World from '../../world/world';
import Cat from './cat';

const world = new World({
  innerWidth: 50,
  innerHeight: 50,
});

test('Cat mob colour is set to the dead one when he is very old', () => {
  const cat = new Cat({
    age: 1,
    world,
  });

  cat.becomeOlder(20);

  const result = cat.color;

  expect(result).toBe('#C5FFFF');
});

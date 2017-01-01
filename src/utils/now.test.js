import { now } from './now';

test('now() returns a string', () => {
  const result = now();

  expect(typeof result).toBe('string');
});

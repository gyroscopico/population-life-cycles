import { guid } from './guid';

test('guid() returns a string', () => {
  const result = guid();

  expect(typeof result).toBe('string');
});

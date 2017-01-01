import { guid } from './guid';

test('guid() returns a string.', () => {
  const result = guid();

  expect(typeof result).toBe('string');
});

test('guid() returns a string of 16 characters.', () => {
  const result = guid();

  expect(result.length).toBe(36);
});

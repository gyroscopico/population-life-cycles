import { scrollToBottom } from './scroll-to-bottom';

test('scrollToBottom updates scrollTop value to scrollHeight.', () => {
  const input = {
    scrollHeight: 5,
    scrollTop: 3,
  };
  const result = scrollToBottom(input);

  expect(result.scrollTop).toBe(input.scrollHeight);
});

export const scrollToBottom = element => {
  element.scrollTop = element.scrollHeight;

  return element;
};

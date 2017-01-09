export const writeText = input => {
  const {
    context,
    color,
    fontSize,
    fontFamily,
    text,
    x,
    y,
  } = input;

  context.fillStyle = color;
  context.font = `${fontSize} ${fontFamily}`;
  context.fillText(text, x, y);

  return context;
};

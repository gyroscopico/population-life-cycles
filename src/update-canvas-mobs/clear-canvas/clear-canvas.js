// Clear a rectangle of canvas.
export const clearCanvas = input => {
  const {
    context,
    topLeft,
    bottomRight,
  } = input;

  context.clearRect(topLeft.x, topLeft.y, bottomRight.x, bottomRight.y);

  return context;
};

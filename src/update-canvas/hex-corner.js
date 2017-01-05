export const hexCorner = (center, radius, i) => {
  const angleDeg = 60 * i + 30;
  const angleRad = angleDeg * Math.PI / 180;

  return {
    x: center.x + radius * Math.cos(angleRad),
    y: center.y + radius * Math.sin(angleRad),
  };
};

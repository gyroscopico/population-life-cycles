import GameCanvas from './game-canvas';

test('GameCanvas sets the width of a given context', () => {
  // Mock refs.
  const refs = {
    canvasWorld: {
      getContext: dimension => {
        return {
          canvas: {},
        };
      }
    }
  };

  const result = new GameCanvas({
    ref: 'canvasWorld',
    refs,
    width: 375,
    height: 618,
  });

  expect(result.context.canvas.width).toBe(375);
});

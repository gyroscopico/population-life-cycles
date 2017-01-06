export default class GameCanvas {
  constructor(input) {
    const {
      ref,
      refs,
      width,
      height,
    } = input;

    this.context = refs[ref].getContext('2d');
    this.context.canvas.width = width;
    this.context.canvas.height = height;
  }
}

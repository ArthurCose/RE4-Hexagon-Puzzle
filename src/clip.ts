import Shape, { Point } from "./shape";

export default class Clip {
  image: HTMLImageElement;
  shape: Shape;
  offset: Point;

  constructor(image: HTMLImageElement, shape: Shape, offset: Point) {
    this.image = image;
    this.shape = shape;
    this.offset = offset;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    this.shape.createPath(ctx);
    ctx.clip();
    ctx.drawImage(this.image, -this.offset.x, -this.offset.y);
    ctx.restore();
  }
}

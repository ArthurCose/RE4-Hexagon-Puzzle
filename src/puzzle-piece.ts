import Clip from "./clip";
import { Point } from "./shape";
import { SlotName } from "./slots";

const RECYCLED_TEST_POINT = { x: 0, y: 0 };

export default class PuzzlePiece {
  slot: SlotName;
  clip: Clip;
  offset: Point;
  rotation: number;

  constructor(slot: SlotName, clip: Clip, offset: Point, rotation: number) {
    this.slot = slot;
    this.clip = clip;
    this.offset = offset;
    this.rotation = rotation;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.offset.x, this.offset.y);
    ctx.rotate(this.rotation);
    this.clip.draw(ctx);
    ctx.restore();
  }

  drawHovered(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.offset.x, this.offset.y);
    ctx.rotate(this.rotation);
    this.clip.shape.createPath(ctx);
    ctx.fillStyle = "#fff4";
    ctx.fill();
    ctx.restore();
  }

  isPointInside(point: Point): boolean {
    RECYCLED_TEST_POINT.x = point.x - this.offset.x;
    RECYCLED_TEST_POINT.y = point.y - this.offset.y;

    return this.clip.shape.isPointInside(RECYCLED_TEST_POINT);
  }
}

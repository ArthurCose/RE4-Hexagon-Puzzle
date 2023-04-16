export type Point = { x: number; y: number };

export default class Shape {
  points: Point[];
  width: number;
  height: number;

  constructor(points: Point[]) {
    this.points = points;

    let minX = 0.0;
    let maxX = 0.0;
    let minY = 0.0;
    let maxY = 0.0;

    for (const point of points) {
      minX = Math.min(point.x, minX);
      maxX = Math.max(point.x, maxX);
      minY = Math.min(point.y, minY);
      maxY = Math.max(point.y, maxY);
    }

    this.width = maxX - minX;
    this.height = maxY - minY;
  }

  scale(scale: number) {
    for (const point of this.points) {
      point.x *= scale;
      point.y *= scale;
    }

    this.width *= scale;
    this.height *= scale;
  }

  createPath(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();

    const firstPoint = this.points[0];
    ctx.moveTo(firstPoint.x, firstPoint.y);

    for (let i = 1; i < this.points.length; i++) {
      const point = this.points[i];
      ctx.lineTo(point.x, point.y);
    }

    ctx.closePath();
  }

  isPointInside(testPoint: Point): boolean {
    let intersectionCount = 0;

    let lastPoint = this.points[this.points.length - 1];

    for (const point of this.points) {
      const rise = point.y - lastPoint.y;
      const run = point.x - lastPoint.x;
      const slope = rise / run;
      const b = point.y - slope * point.x;

      const y = testPoint.x * slope + b;

      const xIsLess = point.x <= testPoint.x || lastPoint.x <= testPoint.x;
      const xIsGreater = point.x >= testPoint.x || lastPoint.x >= testPoint.x;
      const xIsWithin = xIsLess && xIsGreater;

      if (y >= testPoint.y && xIsWithin) {
        intersectionCount += 1;
      }

      lastPoint = point;
    }

    return intersectionCount % 2 == 1;
  }
}

export class Hexagon extends Shape {
  constructor(scale: number) {
    const deg60 = (Math.PI * 60) / 180;
    const offsetX = Math.sin(deg60) * 0.5;

    super([
      { x: 0, y: -0.5 },
      { x: offsetX, y: -0.25 },
      { x: offsetX, y: 0.25 },
      { x: 0, y: 0.5 },
      { x: -offsetX, y: 0.25 },
      { x: -offsetX, y: -0.25 },
    ]);

    this.scale(scale);
  }
}

import Clip from "./clip";
import PuzzlePiece from "./puzzle-piece";
import { Hexagon, Point } from "./shape";
import {
  ALL_GROUPS as ALL_SLOT_GROUPS,
  mapSlotGroup,
  resolveSlotGroup,
  rotateGroup,
} from "./slots";

const BASE_IMAGE = document.getElementById("base-image") as HTMLImageElement;
const CLIP_SHAPE = new Hexagon(170);

export default class Game {
  pieces: PuzzlePiece[];
  mouse: Point;
  clicked: boolean;
  backgroundOffset: Point;

  constructor(canvas: HTMLCanvasElement) {
    this.mouse = { x: 0, y: 0 };
    this.clicked = false;

    canvas.onmousedown = () => {
      this.clicked = true;
    };

    canvas.onmousemove = (event) => {
      const boundingRect = canvas.getBoundingClientRect();
      const xScale = canvas.width / boundingRect.width;
      const yScale = canvas.height / boundingRect.height;

      this.mouse.x = (event.x - boundingRect.left) * xScale;
      this.mouse.y = (event.y - boundingRect.top) * yScale;
    };

    this.pieces = [
      // top row
      new PuzzlePiece(
        "TOP_LEFT",
        new Clip(BASE_IMAGE, CLIP_SHAPE, { x: 440, y: 100 }),
        { x: CLIP_SHAPE.width, y: CLIP_SHAPE.height * 0.5 },
        0
      ),
      new PuzzlePiece(
        "TOP_RIGHT",
        new Clip(BASE_IMAGE, CLIP_SHAPE, { x: 586, y: 100 }),
        { x: CLIP_SHAPE.width * 2, y: CLIP_SHAPE.height * 0.5 },
        0
      ),
      // middle row
      new PuzzlePiece(
        "LEFT",
        new Clip(BASE_IMAGE, CLIP_SHAPE, { x: 366, y: 227 }),
        { x: CLIP_SHAPE.width * 0.5, y: CLIP_SHAPE.height * 1.25 },
        0
      ),
      new PuzzlePiece(
        "CENTER",
        new Clip(BASE_IMAGE, CLIP_SHAPE, { x: 513, y: 227 }),
        { x: CLIP_SHAPE.width * 1.5, y: CLIP_SHAPE.height * 1.25 },
        0
      ),
      new PuzzlePiece(
        "RIGHT",
        new Clip(BASE_IMAGE, CLIP_SHAPE, { x: 660, y: 227 }),
        { x: CLIP_SHAPE.width * 2.5, y: CLIP_SHAPE.height * 1.25 },
        0
      ),
      // bottom row
      new PuzzlePiece(
        "BOTTOM_LEFT",
        new Clip(BASE_IMAGE, CLIP_SHAPE, { x: 439, y: 354 }),
        { x: CLIP_SHAPE.width, y: CLIP_SHAPE.height * 2 },
        0
      ),
      new PuzzlePiece(
        "BOTTOM_RIGHT",
        new Clip(BASE_IMAGE, CLIP_SHAPE, { x: 586, y: 353 }),
        { x: CLIP_SHAPE.width * 2, y: CLIP_SHAPE.height * 2 },
        0
      ),
    ];

    // center the pieces
    const puzzle_width = CLIP_SHAPE.width * 3;
    const puzzle_height = CLIP_SHAPE.height * 2.5;

    const padding_x = (canvas.width - puzzle_width) / 2;
    const padding_y = (canvas.height - puzzle_height) / 2;

    for (const piece of this.pieces) {
      piece.offset.x += padding_x;
      piece.offset.y += padding_y;
    }

    // setup background offset
    const firstPiece = this.pieces[0];
    this.backgroundOffset = {
      x: firstPiece.offset.x - firstPiece.clip.offset.x,
      y: firstPiece.offset.y - firstPiece.clip.offset.y,
    };
  }

  shuffle(amount: number) {
    for (let i = 0; i < amount; i++) {
      const groupIndex = Math.floor(Math.random() * ALL_SLOT_GROUPS.length);
      const group = ALL_SLOT_GROUPS[groupIndex];
      rotateGroup(group, this.pieces);
    }
  }

  update(delta: number) {
    if (this.clicked) {
      this.clicked = false;
    } else {
      return;
    }

    const clickedPiece = this.pieces.find((piece) =>
      piece.isPointInside(this.mouse)
    );

    if (clickedPiece && clickedPiece.slot != "CENTER") {
      const slotGroup = resolveSlotGroup(clickedPiece.slot);
      rotateGroup(slotGroup, this.pieces);
    }
  }

  render(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    // ctx.fillStyle = "#513F2B";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw background
    ctx.drawImage(BASE_IMAGE, this.backgroundOffset.x, this.backgroundOffset.y);

    // draw pieces
    for (const piece of this.pieces) {
      piece.draw(ctx);
    }

    // draw hovered slot group
    const hoveredPiece = this.pieces.find((piece) =>
      piece.isPointInside(this.mouse)
    );

    if (hoveredPiece && hoveredPiece.slot != "CENTER") {
      const slotGroup = resolveSlotGroup(hoveredPiece.slot);
      const groupPieces = mapSlotGroup(slotGroup, this.pieces);

      for (const piece of groupPieces) {
        piece.drawHovered(ctx);
      }
    }
  }
}

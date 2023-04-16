import PuzzlePiece from "./puzzle-piece";

export type SlotName =
  | "CENTER"
  | "LEFT"
  | "RIGHT"
  | "TOP_LEFT"
  | "TOP_RIGHT"
  | "BOTTOM_LEFT"
  | "BOTTOM_RIGHT";

// all specified in counter clockwise order for easy rotation later
export const TOP_SLOT_GROUP: SlotName[] = ["CENTER", "TOP_LEFT", "TOP_RIGHT"];
export const LEFT_SLOT_GROUP: SlotName[] = ["CENTER", "BOTTOM_LEFT", "LEFT"];
export const RIGHT_SLOT_GROUP: SlotName[] = ["CENTER", "RIGHT", "BOTTOM_RIGHT"];
export const ALL_GROUPS: SlotName[][] = [
  TOP_SLOT_GROUP,
  LEFT_SLOT_GROUP,
  RIGHT_SLOT_GROUP,
];

export function resolveSlotGroup(slot: SlotName): SlotName[] {
  if (TOP_SLOT_GROUP.includes(slot)) {
    return TOP_SLOT_GROUP;
  }
  if (LEFT_SLOT_GROUP.includes(slot)) {
    return LEFT_SLOT_GROUP;
  }
  return RIGHT_SLOT_GROUP;
}

export function mapSlotGroup(
  slotGroup: SlotName[],
  pieces: PuzzlePiece[]
): PuzzlePiece[] {
  return slotGroup.map((slot) => pieces.find((piece) => piece.slot == slot)!);
}

export function rotateGroup(slotGroup: SlotName[], pieces: PuzzlePiece[]) {
  const groupPieces = mapSlotGroup(slotGroup, pieces);

  const lastPiece = groupPieces[groupPieces.length - 1];
  let previousSlot = lastPiece.slot;
  let previousOffset = lastPiece.offset;

  for (const piece of groupPieces) {
    const currentSlot = piece.slot;
    const currentOffset = piece.offset;

    piece.slot = previousSlot;
    piece.offset = previousOffset;
    piece.rotation -= (Math.PI * 2) / 3;

    previousSlot = currentSlot;
    previousOffset = currentOffset;
  }
}

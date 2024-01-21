import { Direction } from "$types/card.types";

export const direction = (xDist: number, yDist: number, threshold: number) => {
  if (xDist > +threshold) return Direction.Right;
  if (xDist < -threshold) return Direction.Left;
  if (yDist < -threshold) return Direction.Up;
  return Direction.None;
}

export const getTransformValue = (swipeVisual: Direction) => {
  switch (swipeVisual) {
    case Direction.Left:
      return "translate(-200vw, 0px) rotate(-50deg)";
    case Direction.Right:
      return "translate(200vw, 0px) rotate(50deg)";
    case Direction.Up:
      return `translate(0px, -40vh) rotate(0deg)`;
    default:
      return "translate(0px, 0px)";
  }
};
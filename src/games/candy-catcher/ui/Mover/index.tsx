import { useTick } from "@pixi/react";

export type Direction = "left" | "right";

type MoverProps = {
  direction: Direction | null;
  onMove: (delta: number) => void;
};

export const Mover = ({ direction, onMove }: MoverProps) => {
  useTick(() => {
    if (direction === "left") {
      onMove(-3);
    }
    if (direction === "right") {
      onMove(3);
    }
  });

  return null;
};

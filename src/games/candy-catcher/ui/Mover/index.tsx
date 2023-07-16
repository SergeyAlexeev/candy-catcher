import { useApp, useTick } from "@pixi/react";

export type Direction = "left" | "right";

type MoverProps = {
  direction: Direction | null;
  x: number;
  onMove: (delta: number) => void;
  disabled?: boolean
};

const DELTA = 5;

export const Mover = ({ direction, onMove, x, disabled }: MoverProps) => {
  const app = useApp();

  useTick(() => {
    const nextX = direction === "left" ? x - DELTA : x + DELTA;

    if (nextX < app.screen.left || nextX > app.screen.width || !direction) {
      return;
    }

    onMove(nextX);
  }, !disabled);

  return null;
};

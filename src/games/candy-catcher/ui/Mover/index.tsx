import { useApp, useTick } from "@pixi/react";

export type Direction = "left" | "right";

type MoverProps = {
  direction: Direction | null;
  x: number;
  onMove: (delta: number) => void;
  disabled?: boolean
  speed: number
};

export const Mover = ({ direction, onMove, x, disabled, speed }: MoverProps) => {
  const app = useApp();

  useTick(() => {
    const nextX = direction === "left" ? x - speed : x + speed;

    if (nextX < app.screen.left || nextX > app.screen.width || !direction) {
      return;
    }

    onMove(nextX);
  }, !disabled);

  return null;
};

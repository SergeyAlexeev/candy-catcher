import { Sprite } from "@pixi/react";
import { useState } from "react";

type MoveButtonProps = {
  image: string;
  onPointerDown: () => void;
  onPointerUp: () => void;
  disabled?: boolean;
  defaultY: number
  x: number
  scale: number
};

const PRESS_SHIFT = 5;

export const MoveButton = ({
  image,
  onPointerDown,
  onPointerUp,
  disabled,
  defaultY,
  x,
  scale
}: MoveButtonProps) => {
  const [y, setY] = useState(defaultY);

  const handlePointerDown = () => {
    setY((prev) => prev + PRESS_SHIFT);
    onPointerDown();
  };

  const handlePointerUp = () => {
    setY((prev) => prev - PRESS_SHIFT);
    onPointerUp();
  };

  return (
    <Sprite
      image={image}
      scale={{ x: scale, y: scale }}
      x={x}
      y={y}
      {...(!disabled
        ? {
            interactive: true,
            pointerdown: handlePointerDown,
            pointerup: handlePointerUp,
            pointerout: handlePointerUp,
          }
        : null)}
    />
  );
};

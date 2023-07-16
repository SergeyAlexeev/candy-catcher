import { Sprite, useApp } from "@pixi/react";
import { useState } from "react";

type LeftButtonProps = {
  image: string;
  onPointerDown: () => void;
  onPointerUp: () => void;
  disabled?: boolean;
};

const SCALE = 0.5;
const BUTTON_HEIGHT = 217 * SCALE;
const SCREEN_OFFSET = 20;
const PRESS_SHIFT = 5;

export const LeftButton = ({
  image,
  onPointerDown,
  onPointerUp,
  disabled,
}: LeftButtonProps) => {
  const app = useApp();
  const [y, setY] = useState(app.screen.height - BUTTON_HEIGHT - SCREEN_OFFSET);

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
      scale={{ x: SCALE, y: SCALE }}
      x={SCREEN_OFFSET}
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

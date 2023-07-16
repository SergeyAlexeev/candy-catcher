import { Sprite, useApp } from "@pixi/react";
import { useState } from "react";

type RightButtonProps = {
  image: string;
  onPointerDown: () => void;
  onPointerUp: () => void;
  disabled?: boolean;
};

const SCALE = 0.5;
const BUTTON_HEIGHT = 187 * SCALE;
const BUTTON_WIDTH = 200 * SCALE;
const SCREEN_OFFSET = 20;
const PRESS_SHIFT = 5;

export const RightButton = ({
  image,
  onPointerDown,
  onPointerUp,
  disabled,
}: RightButtonProps) => {
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
      x={app.screen.width - BUTTON_WIDTH - SCREEN_OFFSET}
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

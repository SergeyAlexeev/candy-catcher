import { Sprite, useApp } from "@pixi/react";
import { useState } from "react";

type ThunderButtonProps = {
  onTap: () => void;
  disabled?: boolean;
};

const PRESS_SHIFT = 5

export const ThunderButton = ({ onTap, disabled }: ThunderButtonProps) => {
  const app = useApp();
  const [y, setY] = useState(80);

  const handlePointerDown = () => {
    setY((prev) => prev + PRESS_SHIFT);
  };

  const handlePointerUp = () => {
    setY((prev) => prev - PRESS_SHIFT);
  };

  return (
    <Sprite
      image="assets/candy-catcher/buttons/thunder.png"
      scale={{ x: 0.25, y: 0.25 }}
      x={app.screen.width - 100}
      y={y}
      {...(!disabled
        ? {
            interactive: true,
            onpointertap: onTap,
            pointerdown: handlePointerDown,
            pointerup: handlePointerUp,
          }
        : null)}
    />
  );
};

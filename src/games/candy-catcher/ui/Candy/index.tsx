import { Sprite, useApp, useTick } from "@pixi/react";
import { useState } from "react";

type CandyProps = {
  image: string;
  x: number;
  rotation: number;
  onYChange?: (y: number) => void;
};

export const Candy = ({ image, x, onYChange, rotation }: CandyProps) => {
  const [y, setY] = useState(0);
  const app = useApp();

  useTick(() => {
    setY((prev) => {
      const calculatedNext = prev + 3;
      const next = calculatedNext > app.screen.height ? 0 : calculatedNext;

      onYChange?.(next);
      return next;
    });
  });

  return (
    <Sprite
      image={image}
      scale={{ x: 0.2, y: 0.2 }}
      rotation={rotation}
      anchor={0.5}
      x={x}
      y={y}
    />
  );
};

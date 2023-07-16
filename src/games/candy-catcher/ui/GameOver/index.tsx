import { Sprite, useApp } from "@pixi/react";
import { useCallback, useState } from "react";

type GameOverProps = {
  image: string;
  onRestart: () => void;
};

const PRESS_SHIFT = 5;

export const GameOver = ({ image, onRestart }: GameOverProps) => {
  const app = useApp();
  const [y, setY] = useState(app.screen.height / 2 + 90);
  const handlePointerDown = useCallback(() => {
    setY((prev) => prev + PRESS_SHIFT);
  }, []);

  return (
    <>
      <Sprite
        image={image}
        scale={{ x: 0.5, y: 0.5 }}
        anchor={{ x: 0.5, y: 0.5 }}
        x={app.screen.width / 2}
        y={app.screen.height / 2 - 50}
      />
      <Sprite
        image="assets/candy-catcher/buttons/restart.png"
        scale={{ x: 0.25, y: 0.25 }}
        anchor={{ x: 0.5, y: 0.5 }}
        x={app.screen.width / 2}
        y={y}
        interactive
        pointerdown={handlePointerDown}
        pointerup={onRestart}
      />
    </>
  );
};

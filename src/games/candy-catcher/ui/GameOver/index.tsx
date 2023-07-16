import { Sprite, useApp } from "@pixi/react";

type GameOverProps = {
  image: string;
};

export const GameOver = ({ image }: GameOverProps) => {
  const app = useApp()

  return (
    <Sprite
      image={image}
      scale={{ x: 0.5, y: 0.5 }}
      anchor={{ x: 0.5, y: 0.5 }}
      x={app.screen.width / 2}
      y={app.screen.height / 2}
    />
  );
};

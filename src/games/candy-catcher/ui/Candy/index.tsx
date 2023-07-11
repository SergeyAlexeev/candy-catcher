import { Sprite, useApp, useTick } from "@pixi/react";
import { useEntityStore } from "../../stores/candy";

type CandyProps = {
  image: string;
  rotation: number;
};

export const Candy = ({ image, rotation }: CandyProps) => {
  const app = useApp();
  const { x, y, setY } = useEntityStore();

  useTick(() => {
    setY(app.screen.height);
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

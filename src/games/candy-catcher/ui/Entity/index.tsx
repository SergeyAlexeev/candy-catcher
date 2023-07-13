import { Sprite, useApp, useTick } from "@pixi/react";
import { useEntityStore } from "../../stores/entity";

type EntityProps = {
  image: string;
  rotation: number;
  scaleX?: number;
  scaleY?: number;
};

export const Entity = ({ image, rotation, scaleX = 0.2, scaleY = 0.2 }: EntityProps) => {
  const app = useApp();
  const { x, y, setY } = useEntityStore();

  useTick(() => {
    setY(app.screen.height);
  });

  return (
    <Sprite
      image={image}
      scale={{ x: scaleX, y: scaleY }}
      rotation={rotation}
      anchor={0.5}
      x={x}
      y={y}
    />
  );
};

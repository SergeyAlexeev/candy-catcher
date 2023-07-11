import { Sprite, useApp, useTick } from "@pixi/react";
import { useEntityStore } from "../../stores/entity";

type EntityProps = {
  image: string;
  rotation: number;
};

export const Entity = ({ image, rotation }: EntityProps) => {
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

import { Sprite } from "@pixi/react";

type HeartProps = {
  active: boolean;
  x: number
};

export const Heart = ({ active, x }: HeartProps) => {
  return (
    <Sprite
      image={`assets/candy-catcher/hearts/${
        active ? "active" : "disabled"
      }.png`}
      scale={{ x: 0.1, y: 0.1 }}
      anchor={{ x: 0, y: 0 }}
      x={x}
      y={10}
    />
  );
};

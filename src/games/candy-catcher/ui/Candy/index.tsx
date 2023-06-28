import { Sprite, useTick } from "@pixi/react";
import { useState } from "react";

type CandyProps = {
  image: string
  x: number
}

export const Candy = ({ image, x }: CandyProps) => {
  const [y, setY] = useState(0);

  useTick(() => {
    setY((prev) => {
      const next = prev + 3

      return next > 630 ? 0 : next
    });
  });


  return (
    <Sprite
      image={image}
      scale={{ x: 0.5, y: 0.5 }}
      rotation={30}
      anchor={0.5}
      x={x}
      y={y}
    />
  );
};

import { Sprite } from "@pixi/react";

type CatProps = {
  image: string
}

export const Cat = ({ image }: CatProps) => {
  return (
    <Sprite
      image={image}
      scale={{ x: 0.7, y: 0.7 }}
      anchor={0.5}
      x={100}
      y={400}
    />
  )
}
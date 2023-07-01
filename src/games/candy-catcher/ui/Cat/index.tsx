import { Sprite } from "@pixi/react";

type CatProps = {
  image: string
  x: number
}

export const Cat = ({ image, x }: CatProps) => {
  return (
    <Sprite
      image={image}
      scale={{ x: 0.7, y: 0.7 }}
      anchor={0.5}
      x={x}
      y={500}
    />
  )
}
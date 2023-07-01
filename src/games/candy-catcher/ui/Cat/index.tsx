import { Sprite } from "@pixi/react";

type CatProps = {
  image: string
  x: number
}

const SCALE = 0.7
const CAT_HEIGHT = 284 * SCALE;

export const Cat = ({ image, x }: CatProps) => {
  return (
    <Sprite
      image={image}
      scale={{ x: SCALE, y: SCALE }}
      x={x}
      y={window.innerHeight - CAT_HEIGHT}
    />
  )
}
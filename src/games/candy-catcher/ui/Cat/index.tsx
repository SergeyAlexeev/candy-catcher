import { Sprite, useApp } from "@pixi/react";

type CatProps = {
  image: string
  x: number
}

const SCALE = 0.7
const CAT_HEIGHT = 284 * SCALE;

export const Cat = ({ image, x }: CatProps) => {
  const app = useApp()

  return (
    <Sprite
      image={image}
      scale={{ x: SCALE, y: SCALE }}
      anchor={{ x: 0.5, y: 0 }}
      x={x}
      y={app.screen.height - CAT_HEIGHT}
    />
  )
}
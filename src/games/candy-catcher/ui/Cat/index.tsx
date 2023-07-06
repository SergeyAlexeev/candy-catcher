import { Sprite, useApp } from "@pixi/react";
import { CAT_HEIGHT, SCALE } from "./lib";

type CatProps = {
  image: string
  x: number
}

export const Cat = ({ image, x }: CatProps) => {
  const app = useApp()

  return (
    <Sprite
      image={image}
      scale={{ x: SCALE, y: SCALE }}
      anchor={{ x: 0.5, y: 0.5 }}
      x={x}
      y={app.screen.height - CAT_HEIGHT / 2}
    />
  )
}
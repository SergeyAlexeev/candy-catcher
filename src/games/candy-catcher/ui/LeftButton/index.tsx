import { Sprite, useApp } from "@pixi/react";

type LeftButtonProps = {
  image: string;
  onPress: () => void;
};

const SCALE = 0.5;
const BUTTON_HEIGHT = 217 * SCALE;
const SCREEN_OFFSET = 20;

export const LeftButton = ({ image, onPress }: LeftButtonProps) => {
  const app = useApp()

  return (
    <Sprite
      image={image}
      scale={{ x: SCALE, y: SCALE }}
      x={SCREEN_OFFSET}
      y={app.screen.height - BUTTON_HEIGHT - SCREEN_OFFSET}
      interactive
      pointerdown={onPress}
    />
  );
};

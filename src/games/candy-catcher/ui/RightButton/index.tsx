import { Sprite, useApp } from "@pixi/react";

type RightButtonProps = {
  image: string;
  onPress: () => void
};

const SCALE = 0.5;
const BUTTON_HEIGHT = 187 * SCALE;
const BUTTON_WIDTH = 200 * SCALE;
const SCREEN_OFFSET = 20;

export const RightButton = ({ image, onPress }: RightButtonProps) => {
  const app = useApp()

  return (
    <Sprite
      image={image}
      scale={{ x: SCALE, y: SCALE }}
      x={app.screen.width - BUTTON_WIDTH - SCREEN_OFFSET}
      y={app.screen.height - BUTTON_HEIGHT - SCREEN_OFFSET}
      interactive
      pointerdown={onPress}
    />
  );
};

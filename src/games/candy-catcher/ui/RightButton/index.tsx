import { useApp } from "@pixi/react";
import { MoveButton } from "../MoveButton";

type RightButtonProps = {
  image: string;
  onPointerDown: () => void;
  onPointerUp: () => void;
  disabled?: boolean;
};

const SCALE = 0.5;
const BUTTON_HEIGHT = 187 * SCALE;
const BUTTON_WIDTH = 200 * SCALE;
const SCREEN_OFFSET = 20;

export const RightButton = ({
  image,
  onPointerDown,
  onPointerUp,
  disabled,
}: RightButtonProps) => {
  const app = useApp();

  return (
    <MoveButton
      image={image}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      disabled={disabled}
      scale={SCALE}
      defaultY={app.screen.height - BUTTON_HEIGHT - SCREEN_OFFSET}
      x={app.screen.width - BUTTON_WIDTH - SCREEN_OFFSET}
    />
  );
};

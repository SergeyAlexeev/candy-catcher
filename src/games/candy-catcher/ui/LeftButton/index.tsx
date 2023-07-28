import { useApp } from "@pixi/react";
import { MoveButton } from "../MoveButton";

type LeftButtonProps = {
  image: string;
  onPointerDown: () => void;
  onPointerUp: () => void;
  disabled?: boolean;
};

const SCALE = 0.5;
const SCREEN_OFFSET = 20;

export const LeftButton = ({
  image,
  onPointerDown,
  onPointerUp,
  disabled,
}: LeftButtonProps) => {
  const app = useApp();

  return (
    <MoveButton
      image={image}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      disabled={disabled}
      x={SCREEN_OFFSET}
      defaultY={app.screen.bottom - SCREEN_OFFSET}
      scale={SCALE}
    />
  );
};

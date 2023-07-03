import { Stage as PixiStage } from "@pixi/react";
import { Candy } from "../Candy";
import { Cat } from "../Cat";
import { useCallback, useRef, useState } from "react";
import { LeftButton } from "../LeftButton";
import { RightButton } from "../RightButton";
import { Score } from "../Score";

const move = (cb: () => void) => {
  const interval = setInterval(() => {
    cb();
  }, 100);

  return () => {
    clearInterval(interval);
  };
};

export const Stage = () => {
  const [catX, setCatX] = useState(window.innerWidth / 2);
  const stopper = useRef<() => void>()

  const moveLeft = useCallback(() => {
    const stopMoving = move(() => {
      setCatX((prev) => prev - 10);
    });
    stopper.current = stopMoving
  }, []);

  const moveRight = useCallback(() => {
    const stopMoving = move(() => {
      setCatX((prev) => prev + 10);
    });
    stopper.current = stopMoving
  }, []);

  const stop = () => {
    stopper.current?.();
  };

  return (
    <PixiStage
      options={{ backgroundColor: 0xeef1f5, resizeTo: window }}
      width={window.innerWidth}
      height={window.innerHeight}
    >
      
      <Candy image="assets/candy-catcher/index.png" x={100} />
      <Candy image="assets/candy-catcher/candies/1.png" x={400} />
      <Candy image="assets/candy-catcher/candies/2.png" x={600} />
      <Cat image="assets/candy-catcher/catchers/cat.png" x={catX} />
      <LeftButton
        image="assets/candy-catcher/buttons/left.png"
        onPointerDown={moveLeft}
        onPointerUp={stop}
      />
      <RightButton
        image="assets/candy-catcher/buttons/right.png"
        onPointerDown={moveRight}
        onPointerUp={stop}
      />
      <Score score={100} />
    </PixiStage>
  );
};

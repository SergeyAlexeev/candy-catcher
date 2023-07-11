import { Stage as PixiStage } from "@pixi/react";
import { Candy } from "../Candy";
import { Cat } from "../Cat";
import { CAT_HEIGHT } from "../Cat/lib";
import { useCallback, useEffect, useRef, useState } from "react";
import { LeftButton } from "../LeftButton";
import { RightButton } from "../RightButton";
import { Score } from "../Score";
import { useEntityStore } from "../../stores/candy";
import { useScoreStore } from "../../stores/score";
import { HealthScale } from "../HealthScale";

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

  const { x: candyX, y: candyY, candy, runNewEntity: runNewCandy } = useEntityStore();
  const { incrementScore } = useScoreStore();

  useEffect(() => {
    if (candyY === 0) {
      runNewCandy();
    }
  }, [candyY, runNewCandy]);

  useEffect(() => {
    const intersectX = candyX > catX && candyX < catX + 100;
    const intersectY = candyY > CAT_HEIGHT + 50;

    if (intersectX && intersectY) {
      incrementScore(candy.payload.score);
      runNewCandy();
    }
  }, [candyY, candyX, catX, runNewCandy, incrementScore, candy.payload.score]);

  const stopper = useRef<() => void>();

  const moveLeft = useCallback(() => {
    const stopMoving = move(() => {
      setCatX((prev) => prev - 20);
    });
    stopper.current = stopMoving;
  }, []);

  const moveRight = useCallback(() => {
    const stopMoving = move(() => {
      setCatX((prev) => prev + 20);
    });
    stopper.current = stopMoving;
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
      <Candy image={candy.src} rotation={candy.rotation} />
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
      <Score />
      <HealthScale />
    </PixiStage>
  );
};

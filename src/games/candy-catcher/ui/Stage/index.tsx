import { Stage as PixiStage } from "@pixi/react";
import random from "lodash/random";
import { Candy } from "../Candy";
import { Cat } from "../Cat";
import { CAT_HEIGHT } from "../Cat/lib";
import { useCallback, useEffect, useRef, useState } from "react";
import { LeftButton } from "../LeftButton";
import { RightButton } from "../RightButton";
import { Score } from "../Score";

type CandyItem = {
  src: string;
  rotation: number;
};

const move = (cb: () => void) => {
  const interval = setInterval(() => {
    cb();
  }, 100);

  return () => {
    clearInterval(interval);
  };
};

const candies: CandyItem[] = [
  {
    src: "assets/candy-catcher/index.png",
    rotation: 30,
  },
  { src: "assets/candy-catcher/candies/1.png", rotation: 10 },
  { src: "assets/candy-catcher/candies/2.png", rotation: 70 },
  { src: "assets/candy-catcher/candies/3.png", rotation: 0 },
];

const getCandyX = () => random(150, 700);
const getCandy = () => candies[random(0, candies.length - 1)];

export const Stage = () => {
  const [catX, setCatX] = useState(window.innerWidth / 2);
  const [candy, setCandy] = useState(getCandy());
  const [candyKey, setCandyKey] = useState(new Date().getTime());
  const [candyX, setCandyX] = useState(getCandyX());
  const [candyY, setCandyY] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (candyY === 0) {
      setCandyX(getCandyX());
      setCandy(getCandy());
    }
  }, [candyY]);

  useEffect(() => {
    const intersectX = candyX > catX && candyX < catX + 100;
    const intersectY = candyY > CAT_HEIGHT + 50;

    if (intersectX && intersectY) {
      setScore((prev) => prev + 1);
      setCandyKey(new Date().getTime());
      setCandyX(getCandyX());
      setCandy(getCandy());
    }
  }, [candyY, candyX, catX]);

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
      <Candy
        image={candy.src}
        x={candyX}
        onYChange={setCandyY}
        key={candyKey}
        rotation={candy.rotation}
      />
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
      <Score score={score} />
    </PixiStage>
  );
};

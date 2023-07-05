import { Stage as PixiStage } from "@pixi/react";
import random from 'lodash/random'
import { Candy } from "../Candy";
import { Cat } from "../Cat";
import { useCallback, useEffect, useRef, useState } from "react";
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

const candies = [
  "assets/candy-catcher/index.png",
  "assets/candy-catcher/candies/1.png",
  "assets/candy-catcher/candies/2.png",
];

const getCandyX = () => random(150, 700)
const getCandy = () => candies[random(0, candies.length - 1)]

export const Stage = () => {  
  const [catX, setCatX] = useState(window.innerWidth / 2);
  
  const [candy, setCandy] = useState(getCandy())
  const [candyX, setCandyX] = useState(getCandyX())
  const [candyY, setCandyY] = useState(0);

  useEffect(() => {
    if (candyY === 0) {
      setCandyX(getCandyX())
      setCandy(getCandy())
    }
  }, [candyY])

  const stopper = useRef<() => void>();

  const moveLeft = useCallback(() => {
    const stopMoving = move(() => {
      setCatX((prev) => prev - 10);
    });
    stopper.current = stopMoving;
  }, []);

  const moveRight = useCallback(() => {
    const stopMoving = move(() => {
      setCatX((prev) => prev + 10);
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
      <Candy image={candy} x={candyX} onYChange={setCandyY} />
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

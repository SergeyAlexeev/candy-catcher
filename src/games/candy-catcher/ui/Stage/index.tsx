import { Stage as PixiStage } from "@pixi/react";
import { Entity } from "../Entity";
import { Cat } from "../Cat";
import { CAT_HEIGHT } from "../Cat/lib";
import { useCallback, useEffect, useRef, useState } from "react";
import { LeftButton } from "../LeftButton";
import { RightButton } from "../RightButton";
import { Score } from "../Score";
import { useEntityStore } from "../../stores/entity";
import { useScoreStore } from "../../stores/score";
import { HealthScale } from "../HealthScale";
import { useHealthStore } from "../../stores/health";

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

  const { x: entityX, y: entityY, entity, runNewEntity } = useEntityStore();
  const { incrementScore } = useScoreStore();
  const { changeHealth } = useHealthStore();

  useEffect(() => {
    if (entityY === 0) {
      runNewEntity();
    }
  }, [entityY, runNewEntity]);

  useEffect(() => {
    const intersectX = entityX > catX && entityX < catX + 100;
    const intersectY = entityY > CAT_HEIGHT + 50;

    if (intersectX && intersectY) {
      if (entity.type === "candy") {
        incrementScore(entity.payload.score);
      }
      if (entity.type === "trash") {
        changeHealth(entity.payload.health);
      }
      runNewEntity();
    }
  }, [
    entityY,
    entityX,
    catX,
    runNewEntity,
    incrementScore,
    entity.payload,
    entity.type,
    changeHealth,
  ]);

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
      <Entity image={entity.src} rotation={entity.rotation} />
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

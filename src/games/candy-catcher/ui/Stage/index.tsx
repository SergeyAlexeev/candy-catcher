import { Stage as PixiStage } from "@pixi/react";
import { Entity } from "../Entity";
import { Cat } from "../Cat";
import { CAT_HEIGHT } from "../Cat/lib";
import { useCallback, useEffect /*, useRef*/, useState } from "react";
import { LeftButton } from "../LeftButton";
import { RightButton } from "../RightButton";
import { Score } from "../Score";
import { useEntityStore } from "../../stores/entity";
import { useScoreStore } from "../../stores/score";
import { HealthScale } from "../HealthScale";
import { useHealthStore, MAX_HEALTH } from "../../stores/health";
import { Mover, type Direction } from "../Mover";
import { GameOver } from "../GameOver";
import { useSpeedStore } from "../../stores/speed";
import { ThunderButton } from "../ThunderButton";

export const Stage = () => {
  const [catX, setCatX] = useState(window.innerWidth / 2);
  const [direction, setDirection] = useState<Direction | null>(null);

  const {
    x: entityX,
    y: entityY,
    entity,
    runNewEntity,
    incSpeed,
  } = useEntityStore();
  const { incrementScore, resetScore, score } = useScoreStore();
  const { health, changeHealth } = useHealthStore();
  const { speed, updateSpeed } = useSpeedStore();
  // const moveRef = useRef<number>()

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
      if (entity.type === "trash" || entity.type === "health") {
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

  useEffect(() => {
    if (score === 100) {
      incSpeed();
    }
  }, [incSpeed, score]);

  // const move = (delta: number) => {
  //   setCatX((prev) => prev + delta)
  // }

  const moveLeft = useCallback(() => {
    setDirection("left");
    // move(-3)
    // moveRef.current = setTimeout(moveLeft, 1)
  }, []);

  const moveRight = useCallback(() => {
    setDirection("right");
  }, []);

  const stop = () => {
    // clearInterval(moveRef.current)
    setDirection(null);
  };

  const increaseCatSpeed = useCallback(() => {
    updateSpeed(10);
  }, [updateSpeed]);

  const onMove = useCallback(
    (x: number) => {
      if (health === 0) {
        return;
      }

      setCatX(x);
    },
    [health]
  );

  const restart = useCallback(() => {
    changeHealth(MAX_HEALTH);
    setCatX(window.innerWidth / 2);
    resetScore();
    setDirection(null);
    updateSpeed(5)
  }, [changeHealth, resetScore, updateSpeed]);

  return (
    <PixiStage
      options={{ backgroundColor: 0xeef1f5, resizeTo: window }}
      width={window.innerWidth}
      height={window.innerHeight}
    >
      <Entity
        image={entity.src}
        rotation={entity.rotation}
        scaleX={entity.scaleX}
        scaleY={entity.scaleY}
        disabled={health === 0}
      />
      {health !== 0 && (
        <>
          <Cat image="assets/candy-catcher/catchers/cat.png" x={catX} />
          <Mover
            direction={direction}
            onMove={onMove}
            x={catX}
            disabled={health === 0}
            speed={speed}
          />
        </>
      )}
      <LeftButton
        image="assets/candy-catcher/buttons/left.png"
        onPointerDown={moveLeft}
        onPointerUp={stop}
        disabled={health === 0}
      />
      <RightButton
        image="assets/candy-catcher/buttons/right.png"
        onPointerDown={moveRight}
        onPointerUp={stop}
        disabled={health === 0}
      />
      <Score />
      <ThunderButton onTap={increaseCatSpeed} disabled={health === 0} />
      <HealthScale />
      {health === 0 && (
        <GameOver
          image="assets/candy-catcher/buttons/game_over.png"
          onRestart={restart}
        />
      )}
    </PixiStage>
  );
};

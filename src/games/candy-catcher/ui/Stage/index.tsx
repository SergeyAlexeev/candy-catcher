import { Stage as PixiStage } from "@pixi/react";
import { Candy } from "../Candy";
import { Cat } from "../Cat";
import { useCallback, useState } from "react";
import { LeftButton } from "../LeftButton";
import { RightButton } from "../RightButton";

export const Stage = () => {
  const [catX, setCatX] = useState(window.innerWidth / 2);
  const moveLeft = useCallback(() => {
    setCatX((prev) => prev - 10);
  }, []);
  const moveRight = useCallback(() => {
    setCatX((prev) => prev + 10);
  }, []);

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
        onPress={moveLeft}
      />
      <RightButton
        image="assets/candy-catcher/buttons/right.png"
        onPress={moveRight}
      />
    </PixiStage>
  );
};

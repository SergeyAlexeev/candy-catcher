import { Container, Stage as PixiStage, Text } from "@pixi/react";
import { Candy } from "../Candy";
import { Cat } from "../Cat";
import { useCallback, useState } from "react";

export const Stage = () => {
  const [catX, setCatX] = useState(0)
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    setCatX(e.clientX)
  }, [])

  return (
    <PixiStage
      options={{ backgroundColor: 0xeef1f5 }}
      width={document.documentElement.clientWidth}
      onPointerMove={handlePointerMove}
    >
      <Container x={400} y={330}>
        <Text text="Let's play it!" anchor={{ x: 0.5, y: 0.5 }} />
      </Container>
      <Candy image="assets/candy-catcher/index.png" x={100} />
      <Candy image="assets/candy-catcher/candies/1.png" x={400} />
      <Candy image="assets/candy-catcher/candies/2.png" x={600} />
      <Cat image="assets/candy-catcher/catchers/cat.png" x={catX} />
    </PixiStage>
  );
};

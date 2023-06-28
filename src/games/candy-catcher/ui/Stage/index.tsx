import { Container, Stage as PixiStage, Text } from "@pixi/react";
import { useEffect, useState } from "react";
import { Candy } from "../Candy";

export const Stage = () => {
  const [y, setY] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setY((prev) => {
        const next = prev + 3

        return next > 630 ? 0 : next
      });
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <PixiStage options={{ backgroundColor: '0xeef1f5' }} width={document.documentElement.clientWidth}>
      <Container x={400} y={330}>
        <Text text="Let's play!" anchor={{ x: 0.5, y: 0.5 }} />
      </Container>
      <Candy image="/assets/candy-catcher/index.png" x={100} />
      <Candy image="/assets/candy-catcher/candies/1.png" x={400} />
      <Candy image="/assets/candy-catcher/candies/2.png" x={600} />
    </PixiStage>
  );
};

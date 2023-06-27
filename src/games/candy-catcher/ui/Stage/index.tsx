import { Container, Stage as PixiStage, Sprite, Text } from "@pixi/react";
import { useEffect, useState } from "react";

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
    <PixiStage options={{ backgroundColor: 0xeef1f5 }}>
      <Container x={400} y={330}>
        <Text text="Let's play!" anchor={{ x: 0.5, y: 0.5 }} />
      </Container>
      <Sprite
        image="/assets/candy-catcher/index.png"
        scale={{ x: 0.5, y: 0.5 }}
        rotation={30}
        anchor={0.5}
        x={150}
        y={y}
      />
      <Sprite
        image="/assets/candy-catcher/candies/1.png"
        scale={{ x: 0.5, y: 0.5 }}
        anchor={0.5}
        rotation={-20}
        x={400}
        y={y}
      />
       <Sprite
        image="/assets/candy-catcher/candies/2.png"
        scale={{ x: 0.5, y: 0.5 }}
        anchor={0.5}
        rotation={70}
        x={650}
        y={y}
      />
    </PixiStage>
  );
};

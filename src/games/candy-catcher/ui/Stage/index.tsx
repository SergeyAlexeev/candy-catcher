import { Container, Stage as PixiStage, Sprite, Text } from "@pixi/react";

export const Stage = () => {
  return (
    <PixiStage options={{ backgroundColor: 0xeef1f5 }}>
      <Container x={400} y={330}>
        <Text text="Let's play!" anchor={{ x: 0.5, y: 0.5 }} />
      </Container>
      <Sprite
        image="/assets/candy-catcher/index.png"
        scale={{ x: 0.5, y: 0.5 }}
        anchor={0.5}
        x={150}
        y={150}
      />
    </PixiStage>
  );
};

import * as PIXI from "pixi.js";
import { Container, Text, useApp } from "@pixi/react";
import { useScoreStore } from "../../stores/score";

export const Score = () => {
  const app = useApp();
  const { score } = useScoreStore();

  return (
    <Container x={app.screen.width - 10} y={10}>
      <Text
        text={`Score: ${score}`}
        anchor={{ x: 1, y: 0 }}
        style={
          new PIXI.TextStyle({
            fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
            fontSize: 30,
            fontWeight: "400",
            fill: ["#ffffff", "#00ff99"],
            stroke: "#01d27e",
            strokeThickness: 5,
            letterSpacing: 5,
            dropShadow: true,
            dropShadowColor: "#ccced2",
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
          })
        }
      />
    </Container>
  );
};

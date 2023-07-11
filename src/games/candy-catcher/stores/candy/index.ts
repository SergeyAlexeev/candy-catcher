import { random } from "lodash";
import { create } from "zustand";

type Entities = "candy" | "trash";

type Payload<T extends Entities> = T extends "candy"
  ? {
      score: number;
    }
  : T extends "trash"
  ? { health: number }
  : null;

type Entity<T extends Entities> = {
  src: string;
  rotation: number;
  payload: Payload<T>;
};

type CandyStore = {
  x: number;
  y: number;
  candy: Entity<"candy">;
  setY: (maxY: number) => void;
  runNewCandy: () => void;
};

const candies: Entity<"candy">[] = [
  {
    src: "assets/candy-catcher/index.png",
    rotation: 30,
    payload: { score: 1 },
  },
  {
    src: "assets/candy-catcher/candies/1.png",
    rotation: 10,
    payload: { score: 1 },
  },
  {
    src: "assets/candy-catcher/candies/2.png",
    rotation: 70,
    payload: { score: 1 },
  },
  {
    src: "assets/candy-catcher/candies/3.png",
    rotation: 0,
    payload: { score: 1 },
  },
  {
    src: "assets/candy-catcher/candies/4.png",
    rotation: -45,
    payload: { score: 1 },
  },
  {
    src: "assets/candy-catcher/candies/5.png",
    rotation: -40,
    payload: { score: 1 },
  },
];

const trash: Entity<"trash">[] = [
  { src: "assets/candy-catcher/trash/1.png", rotation: 20, payload: { health: -1 } },
  { src: "assets/candy-catcher/trash/2.png", rotation: -45, payload: { health: -1 } },
]

const getCandyX = () => random(150, 700);
const getCandy = () => candies[random(0, candies.length - 1)];

export const useCandyStore = create<CandyStore>((set) => ({
  x: getCandyX(),
  y: 0,
  candy: getCandy(),
  setY: (maxY: number) =>
    set(({ y }) => {
      const calculatedNext = y + 3;
      const next = calculatedNext > maxY ? 0 : calculatedNext;

      return { y: next };
    }),
  runNewCandy: () => set(() => ({ x: getCandyX(), candy: getCandy(), y: 0 })),
}));

import { random } from "lodash";
import { create } from "zustand";

type CandyItem = {
  src: string;
  rotation: number;
};

type CandyStore = {
  x: number;
  y: number;
  candy: CandyItem;
  setY: (maxY: number) => void;
  runNewCandy: () => void;
};

const candies: CandyItem[] = [
  {
    src: "assets/candy-catcher/index.png",
    rotation: 30,
  },
  { src: "assets/candy-catcher/candies/1.png", rotation: 10 },
  { src: "assets/candy-catcher/candies/2.png", rotation: 70 },
  { src: "assets/candy-catcher/candies/3.png", rotation: 0 },
  { src: "assets/candy-catcher/candies/4.png", rotation: -45 },
  { src: "assets/candy-catcher/candies/5.png", rotation: -40 },
];

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

import { random } from "lodash";
import { create } from "zustand";

type EntityType = "candy" | "trash";

type Payload<T extends EntityType> = T extends "candy"
  ? {
      score: number;
    }
  : T extends "trash"
  ? { health: number }
  : null;

type Entity<T extends EntityType> = {
  src: string;
  rotation: number;
  type: T;
  payload: Payload<T>;
};

type EntityStore = {
  x: number;
  y: number;
  entity: Entity<"candy"> | Entity<"trash">;
  setY: (maxY: number) => void;
  runNewEntity: () => void;
};

const candies: Entity<"candy">[] = [
  {
    src: "assets/candy-catcher/index.png",
    rotation: 30,
    payload: { score: 1 },
    type: "candy",
  },
  {
    src: "assets/candy-catcher/candies/1.png",
    rotation: 10,
    payload: { score: 1 },
    type: "candy",
  },
  {
    src: "assets/candy-catcher/candies/2.png",
    rotation: 70,
    payload: { score: 1 },
    type: "candy",
  },
  {
    src: "assets/candy-catcher/candies/3.png",
    rotation: 0,
    payload: { score: 1 },
    type: "candy",
  },
  {
    src: "assets/candy-catcher/candies/4.png",
    rotation: -45,
    payload: { score: 1 },
    type: "candy",
  },
  {
    src: "assets/candy-catcher/candies/5.png",
    rotation: -40,
    payload: { score: 1 },
    type: "candy",
  },
];

const trash: Entity<"trash">[] = [
  {
    src: "assets/candy-catcher/trash/1.png",
    rotation: 20,
    payload: { health: -1 },
    type: "trash",
  },
  {
    src: "assets/candy-catcher/trash/2.png",
    rotation: -45,
    payload: { health: -1 },
    type: "trash",
  },
];

const getEntityX = () => random(150, 700);
const getEntity = () => {
  const entities = [...candies, ...trash]
  return entities[random(0, entities.length - 1)]
};

export const useEntityStore = create<EntityStore>((set) => ({
  x: getEntityX(),
  y: 0,
  entity: getEntity(),
  setY: (maxY: number) =>
    set(({ y }) => {
      const calculatedNext = y + 3;
      const next = calculatedNext > maxY ? 0 : calculatedNext;

      return { y: next };
    }),
  runNewEntity: () => set(() => ({ x: getEntityX(), entity: getEntity(), y: 0 })),
}));

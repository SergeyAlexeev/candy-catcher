import { create } from "zustand";

type HealthStore = {
  health: number;
  changeHealth: (count: number) => void;
};

export const MAX_HEALTH = 3;
const MIN_HEALTH = 0;

export const useHealthStore = create<HealthStore>((set) => ({
  health: MAX_HEALTH,
  changeHealth: (count: number) =>
    set(({ health }) => {
      const nextHealth = health + count;

      if (nextHealth < MIN_HEALTH) {
        return { health: MIN_HEALTH };
      }

      if (nextHealth > MAX_HEALTH) {
        return { health: MAX_HEALTH };
      }

      return { health: nextHealth };
    }),
}));

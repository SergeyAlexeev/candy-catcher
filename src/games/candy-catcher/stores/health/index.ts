import { create } from "zustand";

type HealthStore = {
  health: number;
  changeHealth: (count: number) => void;
};

export const MAX_HEALTH = 3

export const useHealthStore = create<HealthStore>((set) => ({
  health: 3,
  changeHealth: (count: number) =>
    set(({ health }) => ({ health: health + count })),
}));

import { create } from "zustand";

type HealthStore = {
  health: number;
  incrementHealth: (count: number) => void;
  decrementHealth: (count: number) => void;
};

export const MAX_HEALTH = 3

export const useHealthStore = create<HealthStore>((set) => ({
  health: 3,
  incrementHealth: (count: number) =>
    set(({ health }) => ({ health: health + count })),
  decrementHealth: (count: number) =>
    set(({ health }) => ({ health: health - count })),
}));

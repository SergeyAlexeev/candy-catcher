import { create } from "zustand";

type SpeedStore = {
  speed: number
  updateSpeed: (count: number) => void
}

export const useSpeedStore = create<SpeedStore>((set) => ({
  speed: 5,
  updateSpeed: (count: number) => set(() => ({ speed: count }))
}))

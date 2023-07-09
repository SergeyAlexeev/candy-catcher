import { create } from "zustand";

type ScoreStore = {
  score: number
  incrementScore: (count: number) => void
}

export const useScoreStore = create<ScoreStore>((set) => ({
  score: 0,
  incrementScore: (count: number) => set(({ score }) => ({ score: score + count }))
}))

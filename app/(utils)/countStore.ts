"use client"
import { create } from 'zustand'

interface countState {
  count: number,
  setCount: (count: number) => void
}

export const useCountStore = create<countState>()(
    (set: any) => ({
      count: 0,
      setCount: (count: number) => {
        set((state: any) => ({
          ...state,
          count: count
        }))
      }
    })
)

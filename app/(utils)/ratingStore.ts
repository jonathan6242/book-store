"use client"
import { create } from 'zustand'
import { devtools } from "zustand/middleware";

interface ratingState {
  rating: number,
  setRating: (rating: number) => void
}

export const useRatingStore = create<ratingState>()(
  devtools(
    (set: any) => ({
      rating: 0,
      setRating: (rating: number) => {
        set((state: any) => ({
          ...state,
          rating: rating
        }))
      }
    })
  )
)

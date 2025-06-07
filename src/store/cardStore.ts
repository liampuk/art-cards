import { create } from "zustand"
import { CardId, cardsListFull } from "../cardsList"
import { createJSONStorage, persist } from "zustand/middleware"

type CardStore = {
  cards: CardsCount
  lastOpenedDate: Date
  packsRemaining: number
  setCards: (newCards: CardsCount) => void
  addCard: (id: CardId) => void
  setLastOpenedDate: (date: Date) => void
  setPacksRemaining: (remaining: number) => void
}

export type CardsCount = { [cardId in CardId]: number }

export const useCardStore = create<CardStore>()(
  persist(
    (set, get) => ({
      cards: cardsListFull
        .map((card) => card.id)
        .reduce((obj, cardId) => {
          obj[cardId] = 0
          return obj
        }, {} as CardsCount),
      lastOpenedDate: new Date(0),
      packsRemaining: 3,
      setCards: (newCards: CardsCount) => set({ cards: newCards }),
      addCard: (id: CardId) =>
        set(() => {
          const oldCards = get().cards
          oldCards[id] = (oldCards[id] ?? 0) + 1
          return { cards: oldCards }
        }),
      setLastOpenedDate: (date: Date) => set({ lastOpenedDate: date }),
      setPacksRemaining: (remaining: number) =>
        set({ packsRemaining: remaining }),
    }),
    {
      name: "card-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
)

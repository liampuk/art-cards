import { create } from "zustand"
import { CardId, cardsListFull } from "../cardsList"
import { createJSONStorage, persist } from "zustand/middleware"

type CardStore = {
  cards: { [cardId in CardId]: number }
  setCards: (newCards: { [cardId in CardId]: number }) => void
  addCard: (id: CardId) => void
}

export const useCardStore = create<CardStore>()(
  persist(
    (set, get) => ({
      cards: cardsListFull
        .map((card) => card.image)
        .reduce((obj, cardId) => {
          obj[cardId] = 0
          return obj
        }, {} as { [cardId in CardId]: number }),
      setCards: (newCards: { [cardId in CardId]: number }) =>
        set({ cards: newCards }),
      addCard: (id: CardId) =>
        set(() => {
          const oldCards = get().cards
          oldCards[id] = (oldCards[id] ?? 0) + 1
          return { cards: oldCards }
        }),
    }),
    {
      name: "card-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
)

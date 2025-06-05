import { create } from "zustand"
import { CardId, cardsListFull } from "../cardsList"
import { createJSONStorage, persist } from "zustand/middleware"

type CardStore = {
  cards: Map<CardId, number>
  setCards: (newCards: Map<CardId, number>) => void
  addCard: (id: CardId) => void
}

// export const useCardStore = create<CardStore>((set) => ({
//   cards: new Map(cardsListFull.map((card) => [card.image, 0])),
//   setCards: (newCards: Map<CardId, number>) => set({ cards: newCards }),
//   addCard: (id: CardId) =>
//     set((state) => {
//       const oldCards = state.cards
//       oldCards.set(id, (oldCards.get(id) ?? 0) + 1)
//       return { cards: oldCards }
//     }),
// }))

export const useCardStore = create<CardStore>()(
  persist(
    (set, get) => ({
      cards: new Map(cardsListFull.map((card) => [card.image, 0])),
      setCards: (newCards: Map<CardId, number>) => set({ cards: newCards }),
      addCard: (id: CardId) =>
        set(() => {
          const oldCards = get().cards
          oldCards.set(id, (oldCards.get(id) ?? 0) + 1)
          return { cards: oldCards }
        }),
    }),
    {
      name: "food-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
)

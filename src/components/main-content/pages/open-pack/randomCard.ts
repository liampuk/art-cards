import { cardsListFull } from "../../../../cardsList"

export const randomRare = () => {
  const rares = cardsListFull.filter((card) => "effect" in card)
  return rares[Math.floor(Math.random() * rares.length)]
}

export const randomCommon = () => {
  const commons = cardsListFull.filter((card) => !("effect" in card))
  return commons[Math.floor(Math.random() * commons.length)]
}

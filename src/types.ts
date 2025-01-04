export type Effect = "lines" | "diagonal" | "galaxy"

interface BaseCard {
  artist: string
  image: string
}

interface HoloCard extends BaseCard {
  mask: string
  effect: Effect
}

interface StandardCard extends BaseCard {
  mask?: never
  effect?: never
}

export type Leaf = {
  x: number
  y: number
  rotate: number
  rnd: number
  size: number
  fadeIn: number
}

export type PackState = "closed" | "opening" | "open"

export type Card = HoloCard | StandardCard

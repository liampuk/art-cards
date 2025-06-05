import { Card } from "./types"

export const cardsList: Card[] = [
  /**
   * Rossetti Holo
   */
  {
    artist: "rossetti",
    image: "proserpine",
    mask: "proserpine-mask",
    effect: "lines",
  },
  {
    artist: "rossetti",
    image: "joan-of-arc",
    mask: "joan-of-arc-mask",
    effect: "diagonal",
  },
  {
    artist: "millais",
    image: "mariana",
    mask: "mariana-mask",
    effect: "galaxy",
  },
  {
    artist: "waterhouse",
    image: "the-soul-of-the-rose",
    mask: "the-soul-of-the-rose-mask",
    effect: "diagonal",
  },
]

export const cardsListFull = [
  /**
   * Rossetti Holo
   */
  {
    artist: "rossetti",
    image: "proserpine",
    mask: "proserpine-mask",
    effect: "lines",
  },
  {
    artist: "rossetti",
    image: "joan-of-arc",
    mask: "joan-of-arc-mask",
    effect: "diagonal",
  },
  {
    artist: "rossetti",
    image: "the-day-dream",
    mask: "the-day-dream-mask",
    effect: "galaxy",
  },
  {
    artist: "rossetti",
    image: "veronica-veronese",
    mask: "veronica-veronese-mask",
    effect: "diagonal",
  },
  {
    artist: "rossetti",
    image: "lady-lilith",
    mask: "lady-lilith-mask",
    effect: "diagonal",
  },
  {
    artist: "rossetti",
    image: "la-ghirlandata",
    mask: "la-ghirlandata-mask",
    effect: "lines",
  },
  {
    artist: "rossetti",
    image: "helen-of-troy",
    mask: "helen-of-troy-mask",
    effect: "diagonal",
  },
  /**
   * Millais Holo
   */
  {
    artist: "millais",
    image: "joan-of-arc-2",
    mask: "joan-of-arc-2-mask",
    effect: "lines",
  },
  {
    artist: "millais",
    image: "mariana",
    mask: "mariana-mask",
    effect: "galaxy",
  },
  {
    artist: "millais",
    image: "a-dream-of-the-past",
    mask: "a-dream-of-the-past-mask",
    effect: "lines",
  },
  {
    artist: "millais",
    image: "the-bridesmaid",
    mask: "the-bridesmaid-mask",
    effect: "diagonal",
  },
  {
    artist: "millais",
    image: "ophelia",
    mask: "ophelia-mask",
    effect: "galaxy",
  },
  {
    artist: "millais",
    image: "esther",
    mask: "esther-mask",
    effect: "diagonal",
  },
  /**
   * Waterhouse Holo
   */
  {
    artist: "waterhouse",
    image: "mariana-in-the-south",
    mask: "mariana-in-the-south-mask",
    effect: "diagonal",
  },
  {
    artist: "waterhouse",
    image: "destiny",
    mask: "destiny-mask",
    effect: "galaxy",
  },
  {
    artist: "waterhouse",
    image: "i-am-half-sick-of-shadows",
    mask: "i-am-half-sick-of-shadows-mask",
    effect: "galaxy",
  },
  {
    artist: "waterhouse",
    image: "isabella-and-the-pot-of-basil",
    mask: "isabella-and-the-pot-of-basil-mask",
    effect: "diagonal",
  },
  {
    artist: "waterhouse",
    image: "ophelia-2",
    mask: "ophelia-2-mask",
    effect: "diagonal",
  },
  {
    artist: "waterhouse",
    image: "pandora",
    mask: "pandora-mask",
    effect: "galaxy",
  },
  {
    artist: "waterhouse",
    image: "the-soul-of-the-rose",
    mask: "the-soul-of-the-rose-mask",
    effect: "diagonal",
  },
  /**
   * Rossetti Standard
   */
  { artist: "rossetti", image: "mary-magdalene-leaving" },
  { artist: "rossetti", image: "the-wedding-of-saint-george" },
  { artist: "rossetti", image: "the-annunciation" },
  { artist: "rossetti", image: "pandora-2" },
  /**
   * Millais Standard
   */
  { artist: "millais", image: "hearts-are-trumps-elizabeth" },
  { artist: "millais", image: "hearts-are-trumps-diana" },
  { artist: "millais", image: "hearts-are-trumps-mary" },
  { artist: "millais", image: "only-a-lock-of-hair" },
  { artist: "millais", image: "the-martyr-of-solway" },
  { artist: "millais", image: "portia" },
  { artist: "millais", image: "the-crown-of-love" },
  { artist: "millais", image: "the-captive" },
  { artist: "millais", image: "waiting" },
  { artist: "millais", image: "a-disciple" },
  /**
   * Waterhouse Standard
   */
  { artist: "waterhouse", image: "gathering-almond-blossoms" },
  { artist: "waterhouse", image: "the-lady-of-shalott" },
  { artist: "waterhouse", image: "dolce-far-niente" },
  { artist: "waterhouse", image: "at-capri" },
  { artist: "waterhouse", image: "diogenes" },
  { artist: "waterhouse", image: "cleopatra" },
  { artist: "waterhouse", image: "lamia" },
  { artist: "waterhouse", image: "psyche-entering-cupids-garden" },
  { artist: "waterhouse", image: "circe-offering-the-cup" },
  { artist: "waterhouse", image: "fair-rosamund" },
  { artist: "waterhouse", image: "gather-ye-rosebuds" },
] as const satisfies readonly Card[]

export type CardId = (typeof cardsListFull)[number]["image"]

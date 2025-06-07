import { Card } from "./types"

export const cardsListFull = [
  /**
   * Rossetti Holo
   */
  {
    id: 0,
    artist: "rossetti",
    image: "proserpine",
    mask: "proserpine-mask",
    effect: "lines",
  },
  {
    id: 1,
    artist: "rossetti",
    image: "joan-of-arc",
    mask: "joan-of-arc-mask",
    effect: "diagonal",
  },
  {
    id: 2,
    artist: "rossetti",
    image: "the-day-dream",
    mask: "the-day-dream-mask",
    effect: "galaxy",
  },
  {
    id: 3,
    artist: "rossetti",
    image: "veronica-veronese",
    mask: "veronica-veronese-mask",
    effect: "diagonal",
  },
  {
    id: 4,
    artist: "rossetti",
    image: "lady-lilith",
    mask: "lady-lilith-mask",
    effect: "diagonal",
  },
  {
    id: 5,
    artist: "rossetti",
    image: "la-ghirlandata",
    mask: "la-ghirlandata-mask",
    effect: "lines",
  },
  {
    id: 6,
    artist: "rossetti",
    image: "helen-of-troy",
    mask: "helen-of-troy-mask",
    effect: "diagonal",
  },
  /**
   * Millais Holo
   */
  {
    id: 7,
    artist: "millais",
    image: "joan-of-arc-2",
    mask: "joan-of-arc-2-mask",
    effect: "lines",
  },
  {
    id: 8,
    artist: "millais",
    image: "mariana",
    mask: "mariana-mask",
    effect: "galaxy",
  },
  {
    id: 9,
    artist: "millais",
    image: "a-dream-of-the-past",
    mask: "a-dream-of-the-past-mask",
    effect: "lines",
  },
  {
    id: 10,
    artist: "millais",
    image: "the-bridesmaid",
    mask: "the-bridesmaid-mask",
    effect: "diagonal",
  },
  {
    id: 11,
    artist: "millais",
    image: "ophelia",
    mask: "ophelia-mask",
    effect: "galaxy",
  },
  {
    id: 12,
    artist: "millais",
    image: "esther",
    mask: "esther-mask",
    effect: "diagonal",
  },
  /**
   * Waterhouse Holo
   */
  {
    id: 13,
    artist: "waterhouse",
    image: "mariana-in-the-south",
    mask: "mariana-in-the-south-mask",
    effect: "diagonal",
  },
  {
    id: 14,
    artist: "waterhouse",
    image: "destiny",
    mask: "destiny-mask",
    effect: "galaxy",
  },
  {
    id: 15,
    artist: "waterhouse",
    image: "i-am-half-sick-of-shadows",
    mask: "i-am-half-sick-of-shadows-mask",
    effect: "galaxy",
  },
  {
    id: 16,
    artist: "waterhouse",
    image: "isabella-and-the-pot-of-basil",
    mask: "isabella-and-the-pot-of-basil-mask",
    effect: "diagonal",
  },
  {
    id: 17,
    artist: "waterhouse",
    image: "ophelia-2",
    mask: "ophelia-2-mask",
    effect: "diagonal",
  },
  {
    id: 18,
    artist: "waterhouse",
    image: "pandora",
    mask: "pandora-mask",
    effect: "galaxy",
  },
  {
    id: 19,
    artist: "waterhouse",
    image: "the-soul-of-the-rose",
    mask: "the-soul-of-the-rose-mask",
    effect: "diagonal",
  },
  /**
   * Rossetti Standard
   */
  { id: 20, artist: "rossetti", image: "mary-magdalene-leaving" },
  { id: 21, artist: "rossetti", image: "the-wedding-of-saint-george" },
  { id: 22, artist: "rossetti", image: "the-annunciation" },
  { id: 23, artist: "rossetti", image: "pandora-2" },
  /**
   * Millais Standard
   */
  { id: 24, artist: "millais", image: "hearts-are-trumps-elizabeth" },
  { id: 25, artist: "millais", image: "hearts-are-trumps-diana" },
  { id: 26, artist: "millais", image: "hearts-are-trumps-mary" },
  { id: 27, artist: "millais", image: "only-a-lock-of-hair" },
  { id: 28, artist: "millais", image: "the-martyr-of-solway" },
  { id: 29, artist: "millais", image: "portia" },
  { id: 30, artist: "millais", image: "the-crown-of-love" },
  { id: 31, artist: "millais", image: "the-captive" },
  { id: 32, artist: "millais", image: "waiting" },
  { id: 33, artist: "millais", image: "a-disciple" },
  /**
   * Waterhouse Standard
   */
  { id: 34, artist: "waterhouse", image: "gathering-almond-blossoms" },
  { id: 35, artist: "waterhouse", image: "the-lady-of-shalott" },
  { id: 36, artist: "waterhouse", image: "dolce-far-niente" },
  { id: 37, artist: "waterhouse", image: "at-capri" },
  { id: 38, artist: "waterhouse", image: "diogenes" },
  { id: 39, artist: "waterhouse", image: "cleopatra" },
  { id: 40, artist: "waterhouse", image: "lamia" },
  { id: 41, artist: "waterhouse", image: "psyche-entering-cupids-garden" },
  { id: 42, artist: "waterhouse", image: "circe-offering-the-cup" },
  { id: 43, artist: "waterhouse", image: "fair-rosamund" },
  { id: 44, artist: "waterhouse", image: "gather-ye-rosebuds" },
] as const satisfies readonly Card[]

export type CardId = (typeof cardsListFull)[number]["id"]

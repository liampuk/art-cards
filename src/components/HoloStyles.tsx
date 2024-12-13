// COMMON

const BASE_URL = import.meta.env.BASE_URL

export const glareBackgroundImage = (
  cursorPosXPercentage: number,
  cursorPosYPercentage: number,
  options: { reverse?: boolean } = { reverse: false }
) => {
  return `radial-gradient(farthest-corner circle at ${
    options.reverse ? 100 - cursorPosXPercentage : cursorPosXPercentage
  }% ${cursorPosYPercentage}%, #fff 0%, rgba(134, 138, 141, 0.33) 45%, rgba(51, 51, 51, 0.9) 130%)`
}

export const shineBackgroundPos = (
  backgroundPosX: number,
  backgroundPosY: number
) => {
  return `center, 0% ${backgroundPosY}%,
  ${backgroundPosX}% ${backgroundPosY}%,
  ${backgroundPosX}% ${backgroundPosY}%`
}

export const shineBackgroundOverlayPos = (
  backgroundPosX: number,
  backgroundPosY: number
) => {
  return `center, 0% ${backgroundPosY}%,
-${backgroundPosX}% -${backgroundPosY}%,
${backgroundPosX}% ${backgroundPosY}%`
}

// DIAGONAL SHINE BACKGROUND

export const diagonalShineBackground = (
  cursorPosXSpring: number,
  cursorPosYSpring: number
) => {
  return `url("grain.webp"),
    repeating-linear-gradient(
      0deg,
      hsl(2, 100%, 73%) calc(5% * 1),
      hsl(53, 100%, 69%) calc(5% * 2),
      hsl(93, 100%, 69%) calc(5% * 3),
      hsl(176, 100%, 76%) calc(5% * 4),
      hsl(228, 100%, 74%) calc(5% * 5),
      hsl(283, 100%, 73%) calc(5% * 6),
      hsl(2, 100%, 73%) calc(5% * 7)
    ),
    repeating-linear-gradient(
      133deg,
      #0e152e 0%,
      hsl(180, 10%, 60%) 3.8%,
      hsl(180, 29%, 66%) 4.5%,
      hsl(180, 10%, 60%) 5.2%,
      #0e152e 10%,
      #0e152e 12%
    ),
    radial-gradient(
      farthest-corner circle at ${cursorPosXSpring}% ${cursorPosYSpring}%,
      hsla(0, 0%, 0%, 0.1) 12%,
      hsla(0, 0%, 0%, 0.15) 20%,
      hsla(0, 0%, 0%, 0.25) 120%
    )`
}

// LINES SHINE BACKGROUND

export const linesShineBackground = `
    repeating-linear-gradient(
        110deg,
        #c929f1,
        #0dbde9,
        #21e985,
        #eedf10,
        #f80e35,
        #c929f1,
        #0dbde9,
        #21e985,
        #eedf10,
        #f80e35,
        #c929f1,
        #0dbde9,
        #21e985,
        #eedf10,
        #f80e35
      ),
      repeating-linear-gradient(
        90deg,
        #000 0,
        #000 1px,
        #666 1px,
        #666 2px
      )
  `

export const linesShineBackgroundOverlay = `
repeating-linear-gradient(
    90deg,
    hsla(0, 0%, 0%, 1) calc(3% * 2),
    hsla(0, 0%, 70%, 1) calc(3% * 3),
    hsla(0, 0%, 0%, 1) calc(3% * 3.5),
    hsla(0, 0%, 70%, 1) calc(3% * 4),
    hsla(0, 0%, 0%, 1) calc(3% * 5),
    hsla(0, 0%, 0%, 1) calc(3% * 14)
  ),
  repeating-linear-gradient(
    90deg,
    hsla(0, 0%, 0%, 1) calc(3% * 2),
    hsla(0, 0%, 70%, 1) calc(3% * 3),
    hsla(0, 0%, 0%, 1) calc(3% * 3.5),
    hsla(0, 0%, 70%, 1) calc(3% * 4),
    hsla(0, 0%, 0%, 1) calc(3% * 5),
    hsla(0, 0%, 0%, 1) calc(3% * 10)
  )
`

export const linesShineBackgroundPos = (
  backgroundPosX: number,
  backgroundPosY: number
) => {
  return `calc(((50% - ${backgroundPosX}%)* 2.6) + 50%) calc(((50% - ${backgroundPosY}%)* 3.5) + 50%), center center`
}

export const linesShineBackgroundOverlayPos = (
  backgroundPosX: number,
  backgroundPosY: number
) => {
  return `calc((((50% - ${backgroundPosX}%) * 1.65) + 50%) + (${backgroundPosY}% * 0.5)) ${backgroundPosX}%, calc((((50% - ${backgroundPosX}%) * -0.9) + 50%) - (${backgroundPosY}% * 0.75)) ${backgroundPosY}%`
}

export const linesShineGlareBackground = (
  cursorPosXPercentage: number,
  cursorPosYPercentage: number
) => {
  return `radial-gradient(
    farthest-corner circle
    at ${cursorPosXPercentage}% ${cursorPosYPercentage}%,
    hsla(0, 0%, 90%, 0.9) 0%,
    hsla(0, 0%, 78%, 0.1) 50%,
    hsl(0, 0%, 0%) 90%
  )`
}

// GALAXY SHINE BACKGROUND

export const galaxyShineBackground = (
  cursorPosXPercentage: number,
  cursorPosYPercentage: number
) => {
  return `url("${BASE_URL}galaxy-1.png"),
    repeating-linear-gradient(
      172deg, 
      hsl(53, 65%, 60%) calc(4% * 1), 
      hsl(93, 56%, 50%) calc(4% * 2), 
      hsl(176, 54%, 49%) calc(4% * 3), 
      hsl(228, 59%, 55%) calc(4% * 4), 
      hsl(283, 60%, 55%) calc(4% * 5), 
      hsl(326, 59%, 51%) calc(4% * 6), 
      hsl(326, 59%, 51%) calc(4% * 7), 
      hsl(283, 60%, 55%) calc(4% * 8), 
      hsl(228, 59%, 55%) calc(4% * 9), 
      hsl(176, 54%, 49%) calc(4% * 10), 
      hsl(93, 56%, 50%) calc(4% * 11), 
      hsl(53, 65%, 60%) calc(4% * 12) 
    ), 
    radial-gradient( 
      farthest-corner circle 
      at ${cursorPosXPercentage}% ${cursorPosYPercentage}%, 
      hsla(180, 100%, 89%, 0.5) 5%, 
      hsla(180, 14%, 57%, 0.3) 40%, 
      hsl(0, 0%, 0%) 130% 
  )`
}

// ARTIST BACKGROUND

export const artistBackground = (rotateX: number, rotateY: number) => {
  return `conic-gradient(
      from ${rotateX * 2}deg at 50% 50%,
      rgba(0, 0, 0, 1) 0deg,
      rgba(255, 255, 255, 0.7) 17deg,
      rgba(0, 0, 0, 1) 88deg,
      rgba(255, 255, 255, 0.7) 152deg,
      rgba(0, 0, 0, 1) 225deg,
      rgba(255, 255, 255, 0.7) 289deg,
      rgba(0, 0, 0, 1) 360deg
    ),
    conic-gradient(
      from ${180 - rotateY * 2}deg at 50% 50%,
      rgba(0, 0, 0, 1) 0deg,
      rgba(255, 255, 255, 1) 30deg,
      rgba(0, 0, 0, 1) 96deg,
      rgba(255, 255, 255, 1) 169deg,
      rgba(0, 0, 0, 1) 229deg,
      rgba(255, 255, 255, 1) 285deg,
      rgba(0, 0, 0, 1) 360deg
    ),
    radial-gradient(
      88% 127% at 13% 13%,
      rgba(248, 110, 251, 1) 8%,
      rgba(115, 66, 255, 1) 35%,
      rgba(66, 232, 255, 1) 63%,
      rgba(66, 255, 107, 1) 100%
    )`
}

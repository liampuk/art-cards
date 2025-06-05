import { FC } from "react"
import styled from "styled-components"
import { useWindowSize } from "../../hooks/general"
import { useScrollStore } from "../../store/scrollStore"
import { FallingLeaves } from "./FallingLeaves"

const EXPONENT = 2.5
const NUM_PAGES = 2.5

export const BranchOverlay: FC = () => {
  const { scrollPosition } = useScrollStore()
  const { height: windowHeight } = useWindowSize()
  const height = windowHeight * NUM_PAGES

  return (
    <Container>
      <Branch
        src="branch9.png"
        style={{
          marginTop: `${
            -200 - Math.pow(scrollPosition / height, EXPONENT) * 400
          }px`,
          rotate: `${
            Math.pow(scrollPosition / (height - 200), EXPONENT) * 30
          }deg`,
          opacity: `${
            0.3 - Math.pow(scrollPosition / (height - 200), 2) * 0.45
          }`,
        }}
      />
      <Branch2
        src="branch9.png"
        style={{
          marginTop: `-${
            Math.pow(scrollPosition / height, EXPONENT - 0.2) * 800
          }px`,
          rotate: `${
            Math.pow(scrollPosition / (height - 200), EXPONENT - 0.2) * 35
          }deg`,
          opacity: `${
            0.25 - Math.pow(scrollPosition / (height - 200), 2.4) * 0.4
          }`,
        }}
      />
      <Branch3
        src="branch9.png"
        style={{
          marginTop: `${
            200 - Math.pow(scrollPosition / height, EXPONENT - 0.4) * 900
          }px`,
          rotate: `${
            Math.pow(scrollPosition / (height - 200), EXPONENT - 0.4) * 40
          }deg`,
          opacity: `${
            0.25 - Math.pow(scrollPosition / (height - 200), 2.8) * 0.4
          }`,
        }}
      />
      <FallingLeaves />
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  overscroll-behavior: none;
`

const Branch = styled.img`
  transform: scaleX(-1);
  right: 0;
  position: absolute;
  height: 80%;
  margin-right: -80px;
  animation-name: wave;
  animation-duration: 10s;
  animation-iteration-count: infinite;

  @keyframes wave {
    0%,
    100% {
      transform: scaleX(-1.2) rotate(0deg); /* Neutral position */
    }
    25% {
      transform: scaleX(-1.2) rotate(-3deg) translateY(-20px); /* Slight rotation upward */
    }
    50% {
      transform: scaleX(-1.2) rotate(3deg) translateY(20px); /* Slight rotation downward */
    }
    75% {
      transform: scaleX(-1.2) rotate(-2deg); /* Gentle recovery */
    }
  }
`

const Branch2 = styled(Branch)`
  margin-right: -200px;
  animation-duration: 14s;
`

const Branch3 = styled(Branch)`
  margin-right: -22vw;
  animation-duration: 16s;
`

// magick input.jpg -alpha on -channel a -fx "1-(r+g+b)/3" output.png

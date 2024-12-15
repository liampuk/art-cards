import { FC } from "react"
import styled from "styled-components"
import { useScrollContext } from "../ScrollProvider"
import { useWindowSize } from "../hooks/general"

const EXPONENT = 2.5

export const BranchOverlay: FC = () => {
  const { scrollPosition } = useScrollContext()
  const { height } = useWindowSize()

  return (
    <Container>
      <Branch
        src="branch.png"
        style={{
          marginTop: `${
            -10 - Math.pow(scrollPosition / height, EXPONENT) * 400
          }px`,
          rotate: `${
            Math.pow(scrollPosition / (height - 200), EXPONENT) * 30
          }deg`,
          opacity: `${
            0.45 - Math.pow(scrollPosition / (height - 200), 2) * 0.45
          }`,
        }}
      />
      <Branch2
        src="branch.png"
        style={{
          marginTop: `${
            200 - Math.pow(scrollPosition / height, EXPONENT) * 800
          }px`,
          rotate: `${
            Math.pow(scrollPosition / (height - 200), EXPONENT) * 20
          }deg`,
          opacity: `${
            0.4 - Math.pow(scrollPosition / (height - 200), 2) * 0.4
          }`,
        }}
      />
      <Branch3
        src="branch.png"
        style={{
          marginTop: `${
            400 - Math.pow(scrollPosition / height, EXPONENT) * 900
          }px`,
          rotate: `${
            Math.pow(scrollPosition / (height - 200), EXPONENT) * 20
          }deg`,
          opacity: `${
            0.4 - Math.pow(scrollPosition / (height - 200), 2) * 0.4
          }`,
        }}
      />
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`

const Branch = styled.img`
  transform: scaleX(-1);
  right: 0;
  position: absolute;
  filter: saturate(0) blur(10px);
  mix-blend-mode: multiply;
  opacity: 0.45;
  height: 50%;
  margin-right: -80px;
  animation-name: wave;
  animation-duration: 10s;
  animation-iteration-count: infinite;

  @keyframes wave {
    0%,
    100% {
      transform: scaleX(-1) rotate(0deg); /* Neutral position */
    }
    25% {
      transform: scaleX(-1) rotate(-2deg) translateY(-10px); /* Slight rotation upward */
    }
    50% {
      transform: scaleX(-1) rotate(2deg) translateY(10px); /* Slight rotation downward */
    }
    75% {
      transform: scaleX(-1) rotate(-1deg); /* Gentle recovery */
    }
  }
`

const Branch2 = styled(Branch)`
  margin-right: -200px;
  animation-duration: 14s;
  filter: saturate(0) blur(10px);
  opacity: 0.4;
`

const Branch3 = styled(Branch)`
  margin-right: -400px;
  animation-duration: 16s;
  filter: saturate(0) blur(12px);
  opacity: 0.4;
`

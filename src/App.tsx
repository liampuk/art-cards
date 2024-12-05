import styled from "styled-components"
import { BorderTest } from "./components/BorderTest"
import { MotionCard } from "./components/MotionCard"
import { Sidebar } from "./components/Sidebar"

function App() {
  return (
    <Container>
      <Cards>
        <BorderTest />
        <MotionCard
          cardImage="joan-of-arc-2"
          cardImageMask="joan-of-arc-2-mask"
          shineType="lines"
        />
        <MotionCard
          cardImage="mariana"
          cardImageMask="mariana-mask"
          shineType="galaxy"
        />
        <MotionCard
          cardImage="the-day-dream"
          cardImageMask="the-day-dream-mask"
          shineType="diagonal"
        />
        <MotionCard
          cardImage="joan-of-arc"
          cardImageMask="joan-of-arc-mask"
          shineType="diagonal"
        />
        <MotionCard
          cardImage="gathering-almond-blossoms"
          shineType="diagonal"
        />
      </Cards>
      <Sidebar />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
`

const Cards = styled.div`
  width: 80vw;
  height: 100vh;
  margin-left: 20vw;
`

export default App

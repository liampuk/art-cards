import { MotionCard } from "./components/MotionCard"
import { MotionCard2 } from "./components/MotionCard2"
import { MotionCard6 } from "./components/MotionCard6"

function App() {
  return (
    <>
      <div>
        <MotionCard2 cardImage="mariana" cardImageMask="mariana-mask" />
        <MotionCard
          cardImage="the-day-dream"
          cardImageMask="the-day-dream-mask"
        />
        <MotionCard cardImage="joan-of-arc" cardImageMask="joan-of-arc-mask" />
        <MotionCard cardImage="gathering-almond-blossoms" />

        <MotionCard6 />
      </div>
    </>
  )
}

export default App

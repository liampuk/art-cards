import { motion, useMotionValue, useTransform } from "framer-motion"
import { FC, useState } from "react"
import styled from "styled-components"

const glareBackgroundImage = (
  cursorPosXPercentage: number,
  cursorPosYPercentage: number
) => {
  return `radial-gradient(farthest-corner circle at ${
    100 - cursorPosXPercentage
  }% ${cursorPosYPercentage}%, rgba(255, 255, 255, 0.8) 0%, transparent 100%, transparent 130%)`
}

export const SidebarButton: FC<{ label: string }> = ({ label }) => {
  const [_tempForceUpdate, setTempForceUpdate] = useState(0)

  const [hover, setHover] = useState(false)
  const [clicking, setClicking] = useState(false)

  const cursorPosX = useMotionValue(0)
  const cursorPosY = useMotionValue(0)

  const cursorPosXPercentage = useTransform(() => cursorPosX.get() * 100 - 3)
  const cursorPosYPercentage = useTransform(() => cursorPosY.get() * 100 - 3)

  const handleMouseMove = (ev: React.MouseEvent<HTMLDivElement>) => {
    setHover(true)
    const x = ev.clientX
    const y = ev.clientY

    const offsetLeft = ev.currentTarget.getBoundingClientRect().left
    const offsetTop = ev.currentTarget.getBoundingClientRect().top
    const width = ev.currentTarget.offsetWidth
    const height = ev.currentTarget.offsetHeight

    cursorPosX.set((x - offsetLeft) / width)
    cursorPosY.set((y - offsetTop) / height)
    setTempForceUpdate(Math.random())
  }

  const handleMouseLeave = (_ev: React.MouseEvent<HTMLDivElement>) => {
    setHover(false)
    setTempForceUpdate(Math.random())
  }

  return (
    <Container
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setClicking(true)}
      onMouseUp={() => setClicking(false)}
    >
      <ButtonBox hover={hover}>
        <LabelImage src={`sidebar-${label}.png`} />
      </ButtonBox>
      <Glare
        style={{
          backgroundImage: glareBackgroundImage(
            100 - cursorPosXPercentage.get(),
            cursorPosYPercentage.get()
          ),
          opacity: clicking ? 0.8 : hover ? 0.3 : 0,
        }}
      />
    </Container>
  )
}

const ButtonBox = styled.div<{ hover?: boolean }>`
  width: 200px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #c6c6c6;
    opacity: ${(props) => (props.hover ? 0.9 : 0)};
    transition: opacity 0.2s ease;
    border-radius: 10px;
  }
`
const Container = styled.div`
  cursor: pointer;
`

const LabelImage = styled.img`
  height: 60%;
  margin-top: 8px;
  z-index: 1;
`

const Glare = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.2;
  mix-blend-mode: plus-lighter;
  border-radius: 10px;
  -webkit-mask-image: url("/foil-mask.jpg");
  mask-image: url("/foil-mask.jpg");
  -webkit-mask-size: 300px;
  mask-size: 300px;
  mask-position: center;
  mask-mode: luminance;
  mask-repeat: no-repeat;

  transition: opacity 0.3s ease;
  background-blend-mode: overlay;
`

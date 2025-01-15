import { FC, useState } from "react"
import styled from "styled-components"

const BASE_URL = import.meta.env.BASE_URL

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

  const [cursorPosX, setCursorPosX] = useState(1)
  const [cursorPosY, setCursorPosY] = useState(1)

  const cursorPosXPercentage = cursorPosX * 100 - 3
  const cursorPosYPercentage = cursorPosY * 100 - 3

  const handleMouseMove = (ev: React.MouseEvent<HTMLDivElement>) => {
    setHover(true)
    const x = ev.clientX
    const y = ev.clientY

    const offsetLeft = ev.currentTarget.getBoundingClientRect().left
    const offsetTop = ev.currentTarget.getBoundingClientRect().top
    const width = ev.currentTarget.offsetWidth
    const height = ev.currentTarget.offsetHeight

    setCursorPosX((x - offsetLeft) / width)
    setCursorPosY((y - offsetTop) / height)
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
      <ButtonBox $hover={hover}>
        <LabelText>{label}</LabelText>
      </ButtonBox>
      <Glare
        style={{
          backgroundImage: glareBackgroundImage(
            100 - cursorPosXPercentage,
            cursorPosYPercentage
          ),
          opacity: clicking ? 0.8 : hover ? 0.3 : 0,
        }}
      />
    </Container>
  )
}

const LabelText = styled.p`
  font-size: 1.5vw;
  margin-top: 3.5vh;
  font-family: Mucha;
  font-weight: 400;
  color: #333;
  z-index: 1;
`

const ButtonBox = styled.div<{ $hover?: boolean }>`
  width: 12vw;
  height: 6vh;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #d5d5d5;
    opacity: ${(props) => (props.$hover ? 1 : 0)};
    transition: opacity 0.2s ease;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.06) 0px -2px 4px 0px inset;
  }
`
const Container = styled.div`
  cursor: pointer;
`

const Glare = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  mix-blend-mode: plus-lighter;
  border-radius: 10px;
  -webkit-mask-image: url("${BASE_URL}foil-mask.jpg");
  mask-image: url("${BASE_URL}foil-mask.jpg");
  -webkit-mask-size: 300px;
  mask-size: 300px;
  mask-position: center;
  mask-mode: luminance;
  mask-repeat: no-repeat;

  transition: opacity 0.3s ease;
  background-blend-mode: overlay;
`

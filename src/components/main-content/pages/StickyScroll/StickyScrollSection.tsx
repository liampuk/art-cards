import { forwardRef } from "react"
import styled from "styled-components"

export const StickyScrollSection = forwardRef<
  HTMLDivElement,
  {
    alignSelf: "flex-start" | "flex-end"
    imgSrc: string
  }
>(({ alignSelf, imgSrc }, ref) => {
  return (
    <>
      <Test ref={ref} />
      <Container>
        <StickyText src={imgSrc} $alignSelf={alignSelf} />
      </Container>
    </>
  )
})

const Test = styled.div`
  position: absolute;
  margin-top: -10vh;
  width: 100%;
  height: 60vh;
  /* background-color: rgba(0, 0, 0, 0.5); */
`

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StickyText = styled.img<{ $alignSelf: string }>`
  height: 250px;
  width: fit-content;
  margin: 100px;
  align-self: ${({ $alignSelf }) => $alignSelf};
`

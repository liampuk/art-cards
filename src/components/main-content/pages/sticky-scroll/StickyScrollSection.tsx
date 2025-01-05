import { forwardRef, ReactNode } from "react"
import styled from "styled-components"

export const StickyScrollSection = forwardRef<
  HTMLDivElement,
  {
    imgSrc: string
    triggerMarginTop?: string
    triggerHeight?: string
    copy: ReactNode
  }
>(({ imgSrc, triggerMarginTop, triggerHeight, copy }, ref) => {
  return (
    <>
      <Trigger
        ref={ref}
        $height={triggerHeight}
        $marginTop={triggerMarginTop}
      />
      <Container>
        <CopyColumn>
          <BigCopyText src={imgSrc} />
          {copy}
        </CopyColumn>
      </Container>
    </>
  )
})

const Trigger = styled.div<{ $marginTop?: string; $height?: string }>`
  position: absolute;
  margin-top: ${({ $marginTop }) => $marginTop || "-50vh"};
  width: 100%;
  height: ${({ $height }) => $height || "100vh"};
  /* background-color: rgba(0, 0, 0, 0.2); */
  pointer-events: none;
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  /* background-color: rgba(0, 0, 0, 0.2); */
`

const CopyColumn = styled.div`
  width: 42vw;
  padding: 8vw;
`

const BigCopyText = styled.img`
  height: 30vh;
  margin-bottom: 24px;
  width: fit-content;
`

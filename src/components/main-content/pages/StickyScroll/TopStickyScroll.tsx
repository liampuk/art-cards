import { FC, RefObject } from "react"
import { StickyScrollText } from "./commonStyles"
import { StickyScrollSection } from "./StickyScrollSection"
import { StickyTextButton } from "./StickyScrollTextButton"

export const TopStickyScroll: FC<{ triggerRef: RefObject<HTMLDivElement> }> = ({
  triggerRef,
}) => {
  return (
    <StickyScrollSection
      imgSrc="sticky-text-packs4.jpg"
      ref={triggerRef}
      triggerMarginTop="-50vh"
      triggerHeight="80vh"
      copy={
        <>
          <StickyScrollText>
            Explore the major art movements of the 19th and 20th centuries.
          </StickyScrollText>
          <StickyScrollText>
            Open <StickyTextButton>Pre-Raphaelite</StickyTextButton> packs to
            collect the paintings of Dante Rossetti, John Millais and John
            Waterhouse.
          </StickyScrollText>
        </>
      }
    />
  )
}

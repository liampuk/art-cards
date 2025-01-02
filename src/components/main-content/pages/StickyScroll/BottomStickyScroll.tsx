import { FC, RefObject } from "react"
import { StickyScrollText } from "./commonStyles"
import { StickyScrollSection } from "./StickyScrollSection"
import { StickyTextButton } from "./StickyScrollTextButton"

export const BottomStickyScroll: FC<{
  triggerRef: RefObject<HTMLDivElement>
}> = ({ triggerRef }) => {
  return (
    <StickyScrollSection
      imgSrc="sticky-text-tutorial4.jpg"
      ref={triggerRef}
      triggerMarginTop="-20vh"
      triggerHeight="60vh"
      copy={
        <>
          <StickyScrollText>
            Go to the <StickyTextButton>Tutorial Section</StickyTextButton> to
            see how the holographic card effect works, and how to add your own
            branch of leaves to your website.
          </StickyScrollText>
        </>
      }
    />
  )
}

import { FC, memo, RefObject } from "react"
import { useScrollStore } from "../../../../store"
import { scrollTo } from "../../../../utils"
import { ScrollButton, StickyScrollText } from "./commonStyles"
import { StickyScrollSection } from "./StickyScrollSection"
import { StickyTextButton } from "./StickyScrollTextButton"

export const BottomStickyScroll: FC<{
  triggerRef: RefObject<HTMLDivElement>
}> = memo(({ triggerRef }) => {
  // const { lenis } = useScrollContext()
  const lenis = useScrollStore((state) => state.lenis)

  return (
    <StickyScrollSection
      imgSrc="sticky-text-tutorial4.jpg"
      ref={triggerRef}
      triggerMarginTop="-20vh"
      triggerHeight="60vh"
      copy={
        <>
          <StickyScrollText>
            Go to the
            <ScrollButton onClick={() => scrollTo(lenis, 999)}>
              <StickyTextButton>Tutorial Section</StickyTextButton>
            </ScrollButton>{" "}
            to see how the holographic card effect works, and how to add your
            own branch of leaves to your website.
          </StickyScrollText>
        </>
      }
    />
  )
})

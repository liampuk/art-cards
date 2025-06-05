import { FC, memo, RefObject } from "react"
import { useScrollStore } from "../../../../store/scrollStore"
import { scrollTo } from "../../../../utils"
import { ScrollButton, StickyScrollText } from "./commonStyles"
import { StickyScrollWrapper } from "./StickyScrollSection"
import { StickyTextButton } from "./StickyScrollTextButton"

export const BottomStickyScroll: FC<{
  triggerRef: RefObject<HTMLDivElement>
}> = memo(({ triggerRef }) => {
  const lenis = useScrollStore((state) => state.lenis)

  return (
    <StickyScrollWrapper
      headline="Follow the tutorial to make your own card animations"
      ref={triggerRef}
      triggerMarginTop="-20vh"
      triggerHeight="60vh"
      headlineSize="1.9vw"
      copy={
        <>
          <StickyScrollText>
            Go to the
            <ScrollButton onClick={() => scrollTo(lenis, 999)}>
              <StickyTextButton>About Section</StickyTextButton>
            </ScrollButton>{" "}
            to see how the holographic card effect works, and how to add your
            own branch of leaves to your website.
          </StickyScrollText>
        </>
      }
    />
  )
})

import { FC, memo, RefObject } from "react"
import { useScrollStore } from "../../../../store"
import { scrollTo } from "../../../../utils"
import { ScrollButton, StickyScrollText } from "./commonStyles"
import { StickyScrollSection } from "./StickyScrollSection"
import { StickyTextButton } from "./StickyScrollTextButton"

export const TopStickyScroll: FC<{ triggerRef: RefObject<HTMLDivElement> }> =
  memo(({ triggerRef }) => {
    // const { lenis } = useScrollContext()
    const lenis = useScrollStore((state) => state.lenis)

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
              Open{" "}
              <ScrollButton onClick={() => scrollTo(lenis, 3)}>
                <StickyTextButton>Pre-Raphaelite</StickyTextButton>
              </ScrollButton>{" "}
              packs to collect the paintings of Dante Rossetti, John Millais and
              John Waterhouse.
            </StickyScrollText>
          </>
        }
      />
    )
  })

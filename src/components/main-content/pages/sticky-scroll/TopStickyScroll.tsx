import { FC, memo, RefObject } from "react"
import { useScrollStore } from "../../../../store/scrollStore"
import { scrollTo } from "../../../../utils"
import { ScrollButton, StickyScrollText } from "./commonStyles"
import { StickyScrollWrapper } from "./StickyScrollSection"
import { StickyTextButton } from "./StickyScrollTextButton"

export const TopStickyScroll: FC<{ triggerRef: RefObject<HTMLDivElement> }> =
  memo(({ triggerRef }) => {
    const lenis = useScrollStore((state) => state.lenis)

    return (
      <StickyScrollWrapper
        headline="Open packs to build a collection of timeless art"
        ref={triggerRef}
        triggerMarginTop="-50vh"
        triggerHeight="80vh"
        headlineSize="2.1vw"
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

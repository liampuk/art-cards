import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { FC, useRef } from "react"
import styled from "styled-components"
import { Effect } from "../../types"
import {
  artistBackground,
  diagonalShineBackground,
  galaxyShineBackground,
  glareBackgroundImage,
  linesShineBackground,
  linesShineBackgroundOverlay,
  linesShineBackgroundOverlayPos,
  linesShineBackgroundPos,
  linesShineGlareBackground,
  shineBackgroundOverlayPos,
  shineBackgroundPos,
} from "./HoloStyles"

const BASE_URL = import.meta.env.BASE_URL

type Props = {
  rotateX: number
  rotateY: number
  cardWidth: number
  cardHeight: number
  cardImageMask?: string
  shineType?: Effect
  backgroundPosX: number
  backgroundPosY: number
  cursorPosXPercentage: number
  cursorPosYPercentage: number
  showEffects: boolean
}

export const MotionCardEffects: FC<Props> = ({
  rotateX,
  rotateY,
  cardWidth,
  cardImageMask,
  shineType,
  cardHeight,
  backgroundPosX,
  backgroundPosY,
  cursorPosXPercentage,
  cursorPosYPercentage,
  showEffects,
}) => {
  const brightBackgroundRef = useRef<HTMLDivElement>(null)
  const artistBrightBackgroundRef = useRef<HTMLDivElement>(null)
  const linesShineRef = useRef<HTMLDivElement>(null)
  const diagonalShineRef = useRef<HTMLDivElement>(null)
  const galaxyShineRef = useRef<HTMLDivElement>(null)
  const artistShineRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (brightBackgroundRef.current) {
      gsap.to(brightBackgroundRef.current, {
        opacity: showEffects ? 0.2 : 0,
        duration: 0.1,
        ease: "power1.out",
      })
    }

    if (artistBrightBackgroundRef.current) {
      gsap.to(artistBrightBackgroundRef.current, {
        opacity: showEffects ? 0.1 : 0,
        duration: 0.1,
        ease: "power1.out",
      })
    }

    if (artistShineRef.current) {
      gsap.to(artistShineRef.current, {
        opacity: showEffects ? 0.65 : 0,
        duration: 0.1,
        ease: "power1.out",
      })
    }

    if (linesShineRef.current) {
      gsap.to(linesShineRef.current, {
        opacity: showEffects ? 0.8 : 0,
        duration: 0.1,
        ease: "power1.out",
      })
    }

    if (diagonalShineRef.current) {
      gsap.to(diagonalShineRef.current, {
        opacity: showEffects ? 0.8 : 0,
        duration: 0.1,
        ease: "power1.out",
      })
    }

    if (galaxyShineRef.current) {
      gsap.to(galaxyShineRef.current, {
        opacity: showEffects ? 0.8 : 0,
        duration: 0.1,
        ease: "power1.out",
      })
    }
  }, [showEffects])

  return (
    <>
      <ArtistShine
        ref={artistShineRef}
        style={{
          background: artistBackground(rotateX, rotateY),
          width: cardWidth / 9.8,
          height: cardWidth / 9.8,
          top: cardHeight / 21.8,
          right: cardWidth / 15.7,
          opacity: 0,
        }}
      />
      {cardImageMask && shineType === "lines" && (
        <LinesShine
          ref={linesShineRef}
          style={{
            backgroundImage: linesShineBackground,
            backgroundPosition: linesShineBackgroundPos(
              backgroundPosX,
              backgroundPosY
            ),
          }}
        >
          <LinesShineOverlay
            style={{
              backgroundImage: linesShineBackgroundOverlay,
              backgroundPosition: linesShineBackgroundOverlayPos(
                backgroundPosX,
                backgroundPosY
              ),
            }}
          />
          <ShineGlare
            style={{
              backgroundImage: linesShineGlareBackground(
                cursorPosXPercentage,
                cursorPosYPercentage
              ),
            }}
          />
        </LinesShine>
      )}
      {shineType === "diagonal" && (
        <DiagonalShine
          ref={diagonalShineRef}
          style={{
            backgroundImage: diagonalShineBackground(
              cursorPosXPercentage,
              cursorPosYPercentage
            ),
            backgroundPosition: shineBackgroundPos(
              backgroundPosX,
              backgroundPosY
            ),
          }}
        >
          <DiagonalShineOverlay
            style={{
              backgroundImage: diagonalShineBackground(
                cursorPosXPercentage,
                cursorPosYPercentage
              ),
              backgroundPosition: shineBackgroundOverlayPos(
                backgroundPosX,
                backgroundPosY
              ),
            }}
          />
        </DiagonalShine>
      )}
      {shineType === "galaxy" && (
        <GalaxyShine
          ref={galaxyShineRef}
          style={{
            backgroundImage: galaxyShineBackground(
              cursorPosXPercentage,
              cursorPosYPercentage
            ),
            backgroundPosition: shineBackgroundPos(
              backgroundPosX,
              backgroundPosY
            ),
          }}
        >
          <GalaxyShineOverlay
            style={{
              backgroundImage: galaxyShineBackground(
                cursorPosXPercentage,
                cursorPosYPercentage
              ),
              backgroundPosition: shineBackgroundPos(
                backgroundPosX,
                backgroundPosY
              ),
            }}
          />
        </GalaxyShine>
      )}

      <ArtistBrightBackground
        ref={artistBrightBackgroundRef}
        className="transition-opacity"
        style={{
          // opacity: 0.1,
          opacity: 0,
          width: cardWidth / 10,
          height: cardWidth / 10,
          top: cardHeight / 21.2,
          right: cardHeight / 21.9,
        }}
      />

      <BrightBackground
        ref={brightBackgroundRef}
        className="transition-opacity"
        style={{
          // opacity: 0.2,
          opacity: 0,
          width: "100%",
        }}
      />

      <Glare
        className="transition-opacity"
        style={{
          backgroundImage: glareBackgroundImage(
            cursorPosXPercentage,
            cursorPosYPercentage
          ),
          opacity: 0.3,
          width: "100%",
        }}
      />
    </>
  )
}

const ArtistShine = styled.div`
  position: absolute;
  transform: translateZ(2px);
  background-blend-mode: screen, multiply, normal;
  mix-blend-mode: lighten;
  -webkit-mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><polygon points='50,0 100,50 50,100 0,50' fill='black'/></svg>");
  mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><polygon points='50,0 100,50 50,100 0,50' fill='black'/></svg>");
  -webkit-mask-size: cover;
  mask-size: cover;
  -webkit-mask-position: center center;
  mask-position: center center;
  transition: opacity 0.3s ease-out;

  filter: brightness(1.8) contrast(0.8);
`

const BrightBackground = styled.div`
  top: 0;
  background-image: url("${BASE_URL}hdr_pixel.avif");
  height: 100%;
  position: absolute;
  mix-blend-mode: multiply;
  -webkit-mask-image: var(--card-mask-image);
  mask-image: var(--card-mask-image);
  mask-mode: luminance;
  -webkit-mask-size: cover;
  mask-size: cover;
  -webkit-mask-position: center center;
  mask-position: center center;
`

const ArtistBrightBackground = styled.div`
  top: 0;
  background-image: url("${BASE_URL}hdr_pixel.avif");
  position: absolute;
  mix-blend-mode: multiply;
  -webkit-mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><polygon points='50,0 100,50 50,100 0,50' fill='black'/></svg>");
  mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><polygon points='50,0 100,50 50,100 0,50' fill='black'/></svg>");
  -webkit-mask-size: cover;
  mask-size: cover;
  -webkit-mask-position: center center;
  mask-position: center center;
  opacity: 0.1;
`

const Glare = styled.div`
  overflow: hidden;
  position: absolute;
  top: 0;
  height: 100%;
  border-radius: 4px;
  opacity: 0.3;
  mix-blend-mode: hard-light;
  filter: brightness(0.9) contrast(1.75);
  transition: opacity 0.3s ease;
`

const Shine = styled.div`
  overflow: hidden;
  position: absolute;
  top: 0;
  height: 100%;
  border-radius: 4px;
  -webkit-mask-image: var(--card-mask-image);
  mask-image: var(--card-mask-image);
  mask-mode: luminance;
  -webkit-mask-size: cover;
  mask-size: cover;
  -webkit-mask-position: center center;
  mask-position: center center;
  transition: opacity 0.3s ease;
`

const DiagonalShine = styled(Shine)`
  width: 100%;
  opacity: 0;
  mix-blend-mode: color-dodge;
  background-size: 500px 100%, 200% 700%, 300% 100%, 200% 100%;
  background-blend-mode: screen, hue, hard-light;
  filter: brightness(0.8) contrast(2.95) saturate(0.65);
`

const GalaxyShine = styled(Shine)`
  width: 100%;
  opacity: 0;
  mix-blend-mode: screen;
  background-size: cover, 100% 900%, cover;
  background-blend-mode: color-burn, multiply;
  filter: brightness(1) contrast(1) saturate(0.8);
`

const LinesShine = styled(Shine)`
  width: 100%;
  opacity: 0;
  background-size: 400% 400%, 102%;
  background-blend-mode: overlay;
  mix-blend-mode: color-dodge;
`

const ShineOverlay = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
`

const DiagonalShineOverlay = styled(ShineOverlay)`
  background-blend-mode: screen, hue, hard-light;
  background-size: 500px 100%, 200% 400%, 195% 100%, 200% 100%;
  filter: brightness(1) contrast(2.5) saturate(1.75);
  mix-blend-mode: soft-light;
`

const GalaxyShineOverlay = styled(ShineOverlay)`
  background-blend-mode: overlay, multiply;
  background-size: cover, 400% 900%, cover;
  filter: brightness(1.1) contrast(1.4) saturate(0.8);
  mix-blend-mode: hard-light;
`

const LinesShineOverlay = styled(ShineOverlay)`
  background-size: 150% 150%, 150% 150%;
  background-blend-mode: screen;
  mix-blend-mode: hard-light;
`

const ShineGlare = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  background-position: center center;
  background-size: cover;
  mix-blend-mode: luminosity;
  mix-blend-mode: hard-light;
  filter: brightness(0.8) contrast(1.75);
`

import { useEffect, useRef } from "react"
import styled from "styled-components"
import { cardsListFull } from "../cardsList"

const BASE_URL = import.meta.env.BASE_URL

export const Setup = () => {
  const logged = useRef(false)
  useEffect(() => {
    if (!logged.current) {
      const lines = [
        "%c╔════════════════════════════════════╗",
        "║   ˚                             ˚  ║",
        '║      %c@%c         ^^^       %c"%c         ║',
        "║     \\|/                  |   ˚     ║",
        "║            %cMade by Liam            %c║",
        "║       ^^^                 %c@%c        ║",
        "║    %c@%c    ˚                \\|/    %c+%c  ║",
        "║   \\|/         ˚  ^^^            |  ║",
        "╚════════════════════════════════════╝",
      ]

      console.log(
        lines.join("\n"),
        "color: green;",
        "color: magenta;",
        "color: green;",
        "color: yellow;",
        "color: green;",
        "color: white",
        "color: green;",
        "color: blue;",
        "color: green;",
        "color: red;",
        "color: green;",
        "color: yellow;",
        "color: green;"
      )
      logged.current = true
    }

    cardsListFull.forEach((card) => {
      const img = new Image()
      img.src = `${BASE_URL}${card.artist}/${card.image}-m.jpg`
      if (card.mask) {
        const mask = new Image()
        mask.src = `${BASE_URL}${card.artist}/${card.mask}.jpg`
      }
    })
  })

  return <ForceHdrPixel src={`${BASE_URL}hdr_pixel.avif`} />
}

const ForceHdrPixel = styled.img`
  position: fixed;
  opacity: 0.001;
`
// 𖡼.𖤣𖥧𖡼.𖤣𖥧

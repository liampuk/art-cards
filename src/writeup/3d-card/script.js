import { animate } from "https://cdn.jsdelivr.net/npm/motion@11.11.13/+esm"

const handleMouseMove = (ev) => {
  let isAnimating = false
  if (!isAnimating) {
    isAnimating = true
    requestAnimationFrame(() => {
      const x = ev.clientX
      const y = ev.clientY
      const middleX = window.innerWidth / 2
      const middleY = window.innerHeight / 2
      const offsetX = ((x - middleX) / middleX) * 45
      const offsetY = ((y - middleY) / middleY) * 45

      const cardElement = document.getElementById("card")

      animate(cardElement, { scale: 1.1 }, { duration: 0.3 })

      animate(
        cardElement,
        { rotateX: offsetY, rotateY: -offsetX },
        { type: "spring", stiffness: 200, damping: 10 }
      )
      isAnimating = false
    })
  }
}

const handleMouseLeave = (ev) => {
  let isAnimating = false
  if (!isAnimating) {
    isAnimating = true
    requestAnimationFrame(() => {
      const cardElement = document.getElementById("card")

      animate(cardElement, { scale: 1 }, { duration: 0.3 })

      animate(
        cardElement,
        { rotateX: 0, rotateY: 0 },
        { type: "spring", stiffness: 200, damping: 20 }
      )
      isAnimating = false
    })
  }
}

document.getElementById("card").addEventListener("mousemove", handleMouseMove)

document.getElementById("card").addEventListener("mouseleave", handleMouseLeave)

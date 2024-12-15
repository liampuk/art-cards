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
      const offsetLeft = ev.target.getBoundingClientRect().left
      const offsetTop = ev.target.getBoundingClientRect().top
      const width = ev.target.offsetWidth
      const height = ev.target.offsetHeight
      const cursorPosX = (x - offsetLeft) / width
      const cursorPosY = (y - offsetTop) / height

      const cardElement = document.getElementById("card")
      const glareElement = document.getElementById("glare")
      const shineElement = document.getElementById("shine")
      const shineOverlayElement = document.getElementById("shineOverlay")

      cardElement.style.transform = `scale(1.1) rotateX(${offsetY}deg) rotateY(${-offsetX}deg)`

      const glareBg = `radial-gradient(farthest-corner circle at ${
        cursorPosX * 100
      }% ${cursorPosY * 100}%, #fff 0%, #aaa 15%, #000 100%)`

      const shineBg = `url("grain.webp"),
    repeating-linear-gradient(
      0deg,
      hsl(2, 100%, 73%) calc(5% * 1),
      hsl(53, 100%, 69%) calc(5% * 2),
      hsl(93, 100%, 69%) calc(5% * 3),
      hsl(176, 100%, 76%) calc(5% * 4),
      hsl(228, 100%, 74%) calc(5% * 5),
      hsl(283, 100%, 73%) calc(5% * 6),
      hsl(2, 100%, 73%) calc(5% * 7)
    ),
    repeating-linear-gradient(
      133deg,
      #0e152e 0%,
      hsl(180, 10%, 60%) 3.8%,
      hsl(180, 29%, 66%) 4.5%,
      hsl(180, 10%, 60%) 5.2%,
      #0e152e 10%,
      #0e152e 12%
    ),
    radial-gradient(
      farthest-corner circle at ${cursorPosX * 100}% ${cursorPosY * 100}%,
      hsla(0, 0%, 0%, 0.1) 12%,
      hsla(0, 0%, 0%, 0.15) 20%,
      hsla(0, 0%, 0%, 0.25) 120%
    )`

      const backgroundPosX = cursorPosX * 20 + 40
      const backgroundPosY = cursorPosY * 20 + 40

      const shineBgPos = `center, 0% ${backgroundPosY}%,
  ${backgroundPosX}% ${backgroundPosY}%,
  ${backgroundPosX}% ${backgroundPosY}%`
      const shineOverlayBgPos = `center, 0% ${backgroundPosY}%,
-${backgroundPosX}% -${backgroundPosY}%,
${backgroundPosX}% ${backgroundPosY}%`

      glareElement.style.backgroundImage = glareBg
      shineElement.style.backgroundImage = shineBg
      shineOverlayElement.style.backgroundImage = shineBg
      shineElement.style.backgroundPosition = shineBgPos
      shineOverlayElement.style.backgroundPosition = shineOverlayBgPos

      isAnimating = false
    })
    isAnimating = false
  }
}

const handleMouseLeave = (ev) => {
  let isAnimating = false
  if (!isAnimating) {
    isAnimating = true
    requestAnimationFrame(() => {
      const cardElement = document.getElementById("card")

      cardElement.style.transform = "none"

      isAnimating = false
    })
  }
}

document.getElementById("card").addEventListener("mousemove", handleMouseMove)

document.getElementById("card").addEventListener("mouseleave", handleMouseLeave)

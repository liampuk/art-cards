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

      // animate(cardElement, { scale: 1.1 }, { duration: 0.3 });

      cardElement.style.transform = `scale(1.1) rotateX(${offsetY}deg) rotateY(${-offsetX}deg)`

      const glareBg = `radial-gradient(farthest-corner circle at ${
        cursorPosX * 100
      }% ${cursorPosY * 100}%, #fff 0%, #aaa 15%, #000 100%)`

      glareElement.style.backgroundImage = glareBg

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

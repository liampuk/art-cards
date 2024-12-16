import styled from "styled-components"

export const GrainOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  filter: brightness(120%);
  width: 100vw;
  height: 100vh;
  position: fixed;
  pointer-events: none;
  mix-blend-mode: darken;

  &::after {
    animation: 1s steps(2) 0s infinite normal none running noise;
    background-image: url(https://upload.wikimedia.org/wikipedia/commons/5/5c/Image_gaussian_noise_example.png);
    content: "";
    height: calc(100% + 20rem);
    left: -10rem;
    opacity: 0.12;
    pointer-events: none;
    position: fixed;
    top: -10rem;
    width: calc(100% + 20rem);
    /* background-size: 400px; */
  }

  @keyframes noise {
    0% {
      transform: translate3d(0, 2rem, 0);
    }

    10% {
      transform: translate3d(-1rem, -2rem, 0);
    }

    20% {
      transform: translate3d(-4rem, 1rem, 0);
    }

    30% {
      transform: translate3d(4.5rem, -4.5rem, 0);
    }

    40% {
      transform: translate3d(-1rem, 3.5rem, 0);
    }

    50% {
      transform: translate3d(-4.5rem, -2rem, 0);
    }

    60% {
      transform: translate3d(1rem, 3rem, 0);
    }

    70% {
      transform: translate3d(3.5rem, -4rem, 0);
    }

    80% {
      transform: translate3d(-4.5rem, 0.5rem, 0);
    }

    90% {
      transform: translate3d(3rem, -2.5rem, 0);
    }

    to {
      transform: translate3d(-3.5rem, 0, 0);
    }
  }
`

import styled from "styled-components"

export const GrainOverlay = styled.div`
  z-index: 999;
  animation: 1s steps(2) 0s infinite normal none running noise;
  width: 200vw;
  height: 200vh;
  position: fixed;
  left: -50vw;
  top: -50vh;
  pointer-events: none;
  mix-blend-mode: darken;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' height='100' width='100'%3e%3cfilter id='noise'%3e%3cfeTurbulence type='fractalNoise' baseFrequency='1.0'/%3e%3c/filter%3e%3crect filter='url(%23noise)' width='100%25' height='100%25'/%3e%3c/svg%3e");
  background-size: 160px;
  opacity: 0.4;

  @keyframes noise {
    0% {
      transform: translate3d(0, 2vh, 0);
    }

    10% {
      transform: translate3d(-1vh, -2vh, 0);
    }

    20% {
      transform: translate3d(-4vh, 1vh, 0);
    }

    30% {
      transform: translate3d(4.5vh, -4.5vh, 0);
    }

    40% {
      transform: translate3d(-1vh, 3.5vh, 0);
    }

    50% {
      transform: translate3d(-4.5vh, -2vh, 0);
    }

    60% {
      transform: translate3d(1vh, 3vh, 0);
    }

    70% {
      transform: translate3d(3.5vh, -4vh, 0);
    }

    80% {
      transform: translate3d(-4.5vh, 0.5vh, 0);
    }

    90% {
      transform: translate3d(3vh, -2.5vh, 0);
    }

    to {
      transform: translate3d(-3.5vh, 0, 0);
    }
  }
`

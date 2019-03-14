import styled from '@emotion/styled';

export const Dots = styled('ul')`
  display: flex;
  margin: 0;
  padding: 2px;

  li {
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background: #c1c1c1;
    display: block;
    margin: 0 0 0 8px;
  }

  li:first-of-type {
    margin: 0;
  }

  li:nth-of-type(1) {
    animation: cycleOne 1s ease-in-out infinite;
    animation-direction: normal;
  }

  li:nth-of-type(2) {
    animation: cycleTwo 1s ease-in-out infinite;
    animation-direction: normal;
  }

  li:nth-of-type(3) {
    animation: cycleThree 1s ease-in-out infinite;
    animation-direction: normal;
  }

  @keyframes cycleOne {
    0% {
      background: rgba(150, 150, 150, 0.4);
    }
    33.333% {
      background: #969696;
    }
    66.6667% {
      background: rgba(150, 150, 150, 0.4);
    }
    100% {
      background: rgba(150, 150, 150, 0.4);
    }
  }

  @keyframes cycleTwo {
    0% {
      background: rgba(150, 150, 150, 0.4);
    }
    33.333% {
      background: rgba(150, 150, 150, 0.4);
    }
    66.6667% {
      background: #969696;
    }
    100% {
      background: rgba(150, 150, 150, 0.4);
    }
  }

  @keyframes cycleThree {
    0% {
      background: rgba(150, 150, 150, 0.4);
    }
    33.333% {
      background: rgba(150, 150, 150, 0.4);
    }
    66.6667% {
      background: rgba(150, 150, 150, 0.4);
    }
    100% {
      background: #969696;
    }
  }
`;

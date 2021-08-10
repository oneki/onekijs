import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';

const IconComponent: FC<React.InputHTMLAttributes<HTMLDivElement>> = ({ className }) => {
  return (
    <div className={className}>
      <svg className="o-icon-loading-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle className="o-icon-loading-svg-circle" cx="50" cy="50" r="45" />
      </svg>
    </div>
  );
};

const iconKeyFrame = keyframes`
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
`;

const iconCircleKeyFrame = keyframes`
  0%, 25% {
    stroke-dashoffset: 280;
    transform: rotate(0);
  }

  50%, 75% {
    stroke-dashoffset: 75;
    transform: rotate(45deg);
  }

  100% {
    stroke-dashoffset: 280;
    transform: rotate(360deg);
  }
`;

export default styled(IconComponent)`
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;

  .o-icon-loading-svg {
    animation: 2s linear infinite both ${iconKeyFrame};
  }

  .o-icon-loading-svg-circle {
    animation: 1.4s ease-in-out infinite both ${iconCircleKeyFrame};
    fill: transparent;
    stroke: currentColor;
    stroke-dasharray: 285;
    stroke-linecap: round;
    stroke-width: 10px;
    transform-origin: 50% 50%;
  }
`;

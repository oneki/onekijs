import React, { FC } from 'react';

import { color } from '../../styles/typography';
import { alignItems } from '../../styles/alignment';
import { display } from '../../styles/display';
import { IconProps } from './typings';
import styled, { css } from 'styled-components';
import { marginLeft, marginRight } from '../../styles/spacing';

const IconComponent: FC<IconProps> = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <svg className="o-icon-calendar-svg" viewBox="0 0 512 512">
        <rect
          x="48"
          y="80"
          width="416"
          height="384"
          rx="48"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="32"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
          d="M128 48v32M384 48v32M464 160H48M304 260l43.42-32H352v168M191.87 306.63c9.11 0 25.79-4.28 36.72-15.47a37.9 37.9 0 0011.13-27.26c0-26.12-22.59-39.9-47.89-39.9-21.4 0-33.52 11.61-37.85 18.93M149 374.16c4.88 8.27 19.71 25.84 43.88 25.84 28.59 0 52.12-15.94 52.12-43.82 0-12.62-3.66-24-11.58-32.07-12.36-12.64-31.25-17.48-41.55-17.48"
        />
      </svg>
    </div>
  );
};

export default styled(IconComponent)`
  ${({ width, height, color: cssColor = 'inherit', marginLeft: ml = '0', marginRight: mr = '0' }) => css`
    width: ${width};
    height: ${height};
    ${marginLeft(ml)}
    ${marginRight(mr)}
    ${display('flex')};
    ${alignItems('center')};
    ${color(cssColor)}
    .o-icon-calendar-svg {
      display: inline-block;
      stroke-width: 0;
      stroke: currentColor;
      fill: currentColor;
    }
  `}
`;

import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { color } from '../../styles/typography';
import { alignItems } from '../../styles/alignment';
import { display } from '../../styles/display';
import { SearchIconProps } from './typings';

const IconComponent: FC<SearchIconProps> = ({ className }) => {
  return (
    <div className={className}>
      <svg className="o-icon-search-svg" viewBox="0 0 118.783 118.783">
        <path
          d="M115.97,101.597L88.661,74.286c4.64-7.387,7.333-16.118,7.333-25.488c0-26.509-21.49-47.996-47.998-47.996
		S0,22.289,0,48.798c0,26.51,21.487,47.995,47.996,47.995c10.197,0,19.642-3.188,27.414-8.605l26.984,26.986
		c1.875,1.873,4.333,2.806,6.788,2.806c2.458,0,4.913-0.933,6.791-2.806C119.72,111.423,119.72,105.347,115.97,101.597z
		 M47.996,81.243c-17.917,0-32.443-14.525-32.443-32.443s14.526-32.444,32.443-32.444c17.918,0,32.443,14.526,32.443,32.444
		S65.914,81.243,47.996,81.243z"
        />
      </svg>
    </div>
  );
};

export default styled(IconComponent)`
  ${({ width, height, color: cssColor = 'inherit' }) => css`
    width: ${width};
    height: ${height};
    ${display('flex')};
    ${alignItems('center')};
    ${color(cssColor)}
    .o-icon-search-svg {
      display: inline-block;
      stroke-width: 0;
      stroke: currentColor;
      fill: currentColor;
    }
  `}
`;

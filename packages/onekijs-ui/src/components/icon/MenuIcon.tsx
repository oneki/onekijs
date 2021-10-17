import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { color } from '../../styles/typography';
import { alignItems } from '../../styles/alignment';
import { display } from '../../styles/display';
import { MenuIconProps } from './typings';

const IconComponent: FC<MenuIconProps> = ({ className }) => {
  return (
    <div className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="o-icon-menu-svg">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </div>
  );
};

export default styled(IconComponent)`
  ${({ width = '16px', height = '16px', color: cssColor = 'inherit' }) => css`
    width: ${width};
    height: ${height};
    ${display('flex')};
    ${alignItems('center')};
    ${color(cssColor)}
    .o-icon-search-svg {
      display: inline-block;
      stroke-width: 2;
      stroke: currentColor;
      fill: none;
      stroke-line-cap: round;
      stroke-line-join: round;
    }
  `}
`;

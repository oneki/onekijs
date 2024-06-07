import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { color } from '../../styles/typography';
import { alignItems } from '../../styles/alignment';
import { display } from '../../styles/display';
import { IconProps } from './typings';
import { cursor } from '../../styles/interactivity';
import { marginLeft, marginRight } from '../../styles/spacing';
import { getIconDivProps } from './util';

const IconComponent: FC<IconProps> = (props) => {
  return (
    <div {...getIconDivProps(props)}>
      <svg className="o-icon-menu-svg" viewBox="0 0 100 100">
        <rect width="100" height="15" rx="15" ry="15"></rect>
        <rect y="40" width="100" height="15" rx="15" ry="15"></rect>
        <rect y="80" width="100" height="15" rx="15" ry="15"></rect>
      </svg>
    </div>
  );
};

export default styled(IconComponent)`
  ${({ width = '16px', height = '16px', color: cssColor = 'inherit', marginLeft: ml = '0', marginRight: mr = '0' }) => css`
    width: ${width};
    height: ${height};
    ${marginLeft(ml)}
    ${marginRight(mr)}
    ${display('flex')};
    ${alignItems('center')};
    ${color(cssColor)}
    ${cursor('pointer')}
    .o-icon-menu-svg {
      display: inline-block;
      fill: currentColor;
    }
  `}
`;

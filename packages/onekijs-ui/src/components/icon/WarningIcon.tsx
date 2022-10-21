import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { display } from '../../styles/display';
import { color } from '../../styles/typography';
import { IconProps } from './typings';

const WarningIconComponent: FC<IconProps> = (props) => {
  return (
    <div {...props}>
      <svg className="o-icon-warning-svg" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.56 1h.88l6.54 12.26-.44.74H1.44L1 13.26 7.56 1zM8 2.28L2.28 13H13.7L8 2.28zM8.625 12v-1h-1.25v1h1.25zm-1.25-2V6h1.25v4h-1.25z"
        />
      </svg>
    </div>
  );
};

export default styled(WarningIconComponent)`
  ${({ width = '16px', height = '16px', color: cssColor = 'warning' }) => css`
    width: ${width};
    height: ${height};
    ${display('flex')};
    ${alignItems('center')};
    ${color(cssColor)}
    .o-icon-warning-svg {
      display: inline-block;
      fill: currentColor;
    }
  `}
`;

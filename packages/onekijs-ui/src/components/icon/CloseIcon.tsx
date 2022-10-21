import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { display } from '../../styles/display';
import { color } from '../../styles/typography';
import { IconProps } from './typings';

const CloseIconComponent: FC<IconProps> = (props) => {
  return (
    <div {...props}>
      <svg className="o-icon-close-svg" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 8.707l3.646 3.647.708-.707L8.707 8l3.647-3.646-.707-.708L8 7.293 4.354 3.646l-.707.708L7.293 8l-3.646 3.646.707.708L8 8.707z"
        />
      </svg>
    </div>
  );
};

export default styled(CloseIconComponent)`
  ${({ width = '16px', height = '16px', color: cssColor = 'inherit' }) => css`
    width: ${width};
    height: ${height};
    ${display('flex')};
    ${alignItems('center')};
    ${color(cssColor)}
    .o-icon-close-svg {
      display: inline-block;
      fill: currentColor;
    }
  `}
`;

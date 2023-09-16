import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { display } from '../../styles/display';
import { color } from '../../styles/typography';
import { IconProps } from './typings';

const RefreshIconComponent: FC<IconProps> = (props) => {
  return (
    <div {...props}>
      <svg
        className="o-icon-refresh-svg"
        stroke="currentColor"
        fill="none"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        ></path>
      </svg>
    </div>
  );
};

export default styled(RefreshIconComponent)`
  ${({ width = '16px', height = '16px', color: cssColor = 'inherit' }) => css`
    width: ${width};
    height: ${height};
    ${display('flex')};
    ${alignItems('center')};
    ${color(cssColor)}
    .o-icon-refresh-svg {
      display: inline-block;
    }
  `}
`;

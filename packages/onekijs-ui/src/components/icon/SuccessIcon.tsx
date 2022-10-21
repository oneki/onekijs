import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { display } from '../../styles/display';
import { color } from '../../styles/typography';
import { IconProps } from './typings';

const SuccessIconComponent: FC<IconProps> = (props) => {
  return (
    <div {...props}>
      <svg className="o-icon-success-svg" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.431 3.323l-8.47 10-.79-.036-3.35-4.77.818-.574 2.978 4.24 8.051-9.506.764.646z"
        />
      </svg>
    </div>
  );
};

export default styled(SuccessIconComponent)`
  ${({ width = '16px', height = '16px', color: cssColor = 'success' }) => css`
    width: ${width};
    height: ${height};
    ${display('flex')};
    ${alignItems('center')};
    ${color(cssColor)}
    .o-icon-success-svg {
      display: inline-block;
      fill: currentColor;
    }
  `}
`;

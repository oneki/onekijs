import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { display } from '../../styles/display';
import { color } from '../../styles/typography';
import { IconProps } from './typings';
import { marginLeft, marginRight } from '../../styles/spacing';
import { getIconDivProps } from './util';

const SuccessIconComponent: FC<IconProps> = (props) => {
  return (
    <div {...getIconDivProps(props)}>
      {/* <svg className="o-icon-success-svg" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.431 3.323l-8.47 10-.79-.036-3.35-4.77.818-.574 2.978 4.24 8.051-9.506.764.646z"
        />
      </svg> */}
      <svg className="o-icon-success-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 16" fill="currentColor">
        <path fillRule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z" />
      </svg>
    </div>
  );
};

export default styled(SuccessIconComponent)`
  ${({ width = '16px', height = '16px', color: cssColor = 'success', marginLeft: ml = '0', marginRight: mr = '0' }) => css`
    width: ${width};
    height: ${height};
    ${display('flex')};
    ${alignItems('center')};
    ${color(cssColor)}
    ${marginLeft(ml)}
    ${marginRight(mr)}
    .o-icon-success-svg {
      display: inline-block;
      fill: currentColor;
    }
  `}
`;

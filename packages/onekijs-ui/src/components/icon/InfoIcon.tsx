import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { display } from '../../styles/display';
import { color } from '../../styles/typography';
import { IconProps } from './typings';
import { marginLeft, marginRight } from '../../styles/spacing';
import { fill } from '../../styles/svg';
import { getIconDivProps } from './util';

const InfoIconComponent: FC<IconProps> = (props) => {
  return (
    <div {...getIconDivProps(props)}>
      <svg className="o-icon-info-svg" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.568 1.031A6.8 6.8 0 0 1 12.76 3.05a7.06 7.06 0 0 1 .46 9.39 6.85 6.85 0 0 1-8.58 1.74 7 7 0 0 1-3.12-3.5 7.12 7.12 0 0 1-.23-4.71 7 7 0 0 1 2.77-3.79 6.8 6.8 0 0 1 4.508-1.149zM9.04 13.88a5.89 5.89 0 0 0 3.41-2.07 6.07 6.07 0 0 0-.4-8.06 5.82 5.82 0 0 0-7.43-.74 6.06 6.06 0 0 0 .5 10.29 5.81 5.81 0 0 0 3.92.58zM7.375 6h1.25V5h-1.25v1zm1.25 1v4h-1.25V7h1.25z"
        />
      </svg>
    </div>
  );
};

export default styled(InfoIconComponent)`
  ${({ width = '16px', height = '16px', color: cssColor = 'info', marginLeft: ml = '0', marginRight: mr = '0' }) => css`
    width: ${width};
    height: ${height};
    ${marginLeft(ml)}
    ${marginRight(mr)}
    ${display('flex')};
    ${alignItems('center')};
    ${color(cssColor)}
    .o-icon-info-svg {
      display: inline-block;
      ${fill('currentColor')}
    }
  `}
`;

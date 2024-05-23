import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { display } from '../../styles/display';
import { color } from '../../styles/typography';
import { IconProps } from './typings';
import { marginLeft, marginRight } from '../../styles/spacing';

const IconComponent: FC<IconProps> = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <svg className="o-icon-close-all-svg" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.621 8.086l-.707-.707L6.5 8.793 5.086 7.379l-.707.707L5.793 9.5l-1.414 1.414.707.707L6.5 10.207l1.414 1.414.707-.707L7.207 9.5l1.414-1.414z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5 3l1-1h7l1 1v7l-1 1h-2v2l-1 1H3l-1-1V6l1-1h2V3zm1 2h4l1 1v4h2V3H6v2zm4 1H3v7h7V6z"
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
    .o-icon-close-all-svg {
      fill: currentColor;
    }
  `}
`;

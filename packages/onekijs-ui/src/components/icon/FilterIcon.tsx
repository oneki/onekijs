import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { display } from '../../styles/display';
import { color } from '../../styles/typography';
import { IconProps } from './typings';
import { marginLeft, marginRight } from '../../styles/spacing';

// <!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) -->
const IconComponent: FC<IconProps> = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <svg className="o-icon-filter-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z" />
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
    .o-icon-filter-svg {
      display: inline-block;
      stroke-width: 0;
      stroke: currentColor;
      fill: currentColor;
    }
  `}
`;

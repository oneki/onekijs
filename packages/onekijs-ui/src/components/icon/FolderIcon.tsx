import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { addClassname } from '../../utils/style';
import { alignItems } from '../../styles/alignment';
import { display } from '../../styles/display';
import { IconProps } from './typings';

const IconComponent: FC<IconProps> = (props) => {
  const className = addClassname('o-icon-folder', props.className);
  return (
    <div {...props} className={className}>
      <svg
        className="o-icon-folder-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24px"
        height="24px"
      >
        <path d="M20,6h-8l-2-2H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8C22,6.9,21.1,6,20,6z" />
      </svg>
    </div>
  );
};

export default styled(IconComponent)`
  ${({ width = '24px', height = '24px', color: cssColor = 'currentColor' }) => css`
    width: ${width};
    height: ${height};
    ${display('flex')};
    ${alignItems('center')};
    .o-icon-folder-svg {
      display: inline-block;
      fill: ${cssColor};
    }
  `}
`;
import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { display } from '../../styles/display';
import { addClassname } from '../../utils/style';
import { IconProps } from './typings';

const IconComponent: FC<IconProps> = (props) => {
  const className = addClassname('o-icon-file', props.className);
  return (
    <div {...props} className={className}>
      <svg
        className="o-icon-file-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 1024"
        width="16px"
        height="16px"
      >
        <path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494z" />
      </svg>
    </div>
  );
};

export default styled(IconComponent)`
  ${({ width = '16px', height = '16px', color: cssColor = 'currentColor' }) => css`
    width: ${width};
    height: ${height};
    ${display('flex')};
    ${alignItems('center')};
    .o-icon-file-svg {
      display: inline-block;
      fill: ${cssColor};
    }
  `}
`;
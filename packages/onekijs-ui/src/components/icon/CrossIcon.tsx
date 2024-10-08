//#region -- system import
import React, { FC } from 'react';
import styled from 'styled-components';
import { IconProps } from './typings';
//#endregion

const IconComponent: FC<IconProps> = ({ className }) => {
  return (
    <div className={className}>
      <svg className="o-icon-close-svg" viewBox="0 0 100 100">
        <path d="M35.6 34.4L28 26.8l7.6-7.6c.2-.2.2-.5 0-.7l-.5-.5c-.2-.2-.5-.2-.7 0l-7.6 7.6-7.5-7.6c-.2-.2-.5-.2-.7 0l-.6.6c-.2.2-.2.5 0 .7l7.6 7.6-7.6 7.5c-.2.2-.2.5 0 .7l.5.5c.2.2.5.2.7 0l7.6-7.6 7.6 7.6c.2.2.5.2.7 0l.5-.5c.2-.2.2-.5 0-.7z" />
      </svg>
    </div>
  );
};

const CrossIcon = styled(IconComponent)`
  width: ${(props) => props.width || '32px'};
  height: ${(props) => props.height || '32px'};
  margin-top: ${(props) => props.marginRight || '0px'};
  margin-left: ${(props) => props.marginLeft || '0px'};
  .o-icon-close-svg {
    display: inline-block;
    stroke-width: 0;
    stroke: currentColor;
    fill: currentColor;
    font-size: 3rem;
    color: #666e6e;
    opacity: 0.6;
  }
`;

export default CrossIcon;

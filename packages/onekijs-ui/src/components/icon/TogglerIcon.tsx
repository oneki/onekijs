import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { display } from '../../styles/display';
import { color } from '../../styles/typography';
import { addClassname } from '../../utils/style';
import LoadingIcon from './LoadingIcon';
import { TogglerIconProps } from './typings';
import { backgroundColor } from '../../styles/background';

const IconComponent: FC<TogglerIconProps> = ({
  className,
  onClick,
  open,
  loading,
  visible = true,
  model = 'arrow',
}) => {
  const iconClassName = addClassname('o-toggler-icon-container', className);
  if (!visible) {
    return <div className={iconClassName}></div>;
  } else if (!loading) {
    return (
      <div className={iconClassName} onClick={onClick}>
        <div className="o-toggler-icon">
          {model === 'arrow' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              transform={`rotate(${open ? '180' : '90'})`}
              className="o-toggler-arrow"
            >
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          )}
          {model === 'plus' && (
            <div className={`o-toggler-plus${open ? ' o-toggler-plus-active' : ''}`}>
              <span></span>
              <span></span>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="o-toggler-icon-container">
        <LoadingIcon />
      </div>
    );
  }
};

const TogglerIcon = styled(IconComponent)`
  ${({ width = '24px', height = '24px', color: cssColor = 'inherit' }) => css`
    width: ${width};
    height: ${height};
    ${display('flex')};
    ${alignItems('center')};
    ${color(cssColor)}
    .o-toggler-icon {
      display: inline-block;
      width: 100%;
      height: 100%;
      .o-toggler-arrow {
        stroke-width: 2;
        stroke: currentColor;
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
        transition: all 150ms ease-in-out;
      }
      .o-toggler-plus {
        border: 0;
        position: relative;
        width: 100%;
        height: 100%;
        span {
          position: absolute;
          transition: 300ms;
          ${backgroundColor(cssColor)}
          border-radius: 2px;
        }

        span:first-child {
          top: 25%;
          bottom: 25%;
          width: 10%;
          left: 45%;
        }

        span:last-child {
          left: 25%;
          right: 25%;
          height: 10%;
          top: 45%;
        }

        &.o-toggler-plus-active span {
          transform: rotate(90deg);
        }

        &.o-toggler-plus-active span:last-child {
          left: 50%;
          right: 50%;
        }
      }
    }
  `}
`;

export default TogglerIcon;

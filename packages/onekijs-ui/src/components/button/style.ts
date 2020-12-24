import { ButtonProps } from 'antd/lib/button';
import { css } from 'styled-components';
import { ComponentStyle } from '../../styles/typings';

// const buttonStyle: ComponentStyle<ButtonProps> = ({ kind = 'primary', theme }) => {
//   const t = theme.button[kind];
//   return css`
//     ${backgroundColor(t.backgroundColor, {
//       hover: t.hoverBackgroundColor,
//     })}
//     ${color(t.color)}
//     ${fontWeight(t.fontWeight)}
//     ${paddingX(t.paddingX)}
//     ${paddingY(t.paddingY)}
//   `;
// };

const buttonStyle: ComponentStyle<ButtonProps> = () => {
  return css`
    &.ant-btn {
      line-height: 1.5715;
      position: relative;
      display: inline-block;
      font-weight: 400;
      white-space: nowrap;
      text-align: center;
      background-image: none;
      border: 1px solid transparent;
      -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
      box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
      cursor: pointer;
      -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      -ms-touch-action: manipulation;
      touch-action: manipulation;
      height: 32px;
      padding: 4px 15px;
      font-size: 14px;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.85);
      background: #fff;
      border-color: #d9d9d9;
    }
    &.ant-btn > .anticon {
      line-height: 1;
    }
    &.ant-btn,
    &.ant-btn:active,
    &.ant-btn:focus {
      outline: 0;
    }
    &.ant-btn:not([disabled]):hover {
      text-decoration: none;
    }
    &.ant-btn:not([disabled]):active {
      outline: 0;
      -webkit-box-shadow: none;
      box-shadow: none;
    }
    &.ant-btn[disabled] {
      cursor: not-allowed;
    }
    &.ant-btn[disabled] > * {
      pointer-events: none;
    }
    &.ant-btn-lg {
      height: 40px;
      padding: 6.4px 15px;
      font-size: 16px;
      border-radius: 2px;
    }
    &.ant-btn-sm {
      height: 24px;
      padding: 0px 7px;
      font-size: 14px;
      border-radius: 2px;
    }
    &.ant-btn > a:only-child {
      color: currentColor;
    }
    &.ant-btn > a:only-child::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: transparent;
      content: '';
    }
    &.ant-btn:hover,
    &.ant-btn:focus {
      color: #40a9ff;
      background: #fff;
      border-color: #40a9ff;
    }
    &.ant-btn:hover > a:only-child,
    &.ant-btn:focus > a:only-child {
      color: currentColor;
    }
    &.ant-btn:hover > a:only-child::after,
    &.ant-btn:focus > a:only-child::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: transparent;
      content: '';
    }
    &.ant-btn:active {
      color: #096dd9;
      background: #fff;
      border-color: #096dd9;
    }
    &.ant-btn:active > a:only-child {
      color: currentColor;
    }
    &.ant-btn:active > a:only-child::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: transparent;
      content: '';
    }
    &.ant-btn[disabled],
    &.ant-btn[disabled]:hover,
    &.ant-btn[disabled]:focus,
    &.ant-btn[disabled]:active {
      color: rgba(0, 0, 0, 0.25);
      background: #f5f5f5;
      border-color: #d9d9d9;
      text-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
    }
    &.ant-btn[disabled] > a:only-child,
    &.ant-btn[disabled]:hover > a:only-child,
    &.ant-btn[disabled]:focus > a:only-child,
    &.ant-btn[disabled]:active > a:only-child {
      color: currentColor;
    }
    &.ant-btn[disabled] > a:only-child::after,
    &.ant-btn[disabled]:hover > a:only-child::after,
    &.ant-btn[disabled]:focus > a:only-child::after,
    &.ant-btn[disabled]:active > a:only-child::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: transparent;
      content: '';
    }
    &.ant-btn:hover,
    &.ant-btn:focus,
    &.ant-btn:active {
      text-decoration: none;
      background: #fff;
    }
    &.ant-btn > span {
      display: inline-block;
    }
    &.ant-btn-primary {
      color: #fff;
      background: #1890ff;
      border-color: #1890ff;
      text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
      -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
      box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
    }
    &.ant-btn-primary > a:only-child {
      color: currentColor;
    }
    &.ant-btn-primary > a:only-child::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: transparent;
      content: '';
    }
    &.ant-btn-primary:hover,
    &.ant-btn-primary:focus {
      color: #fff;
      background: #40a9ff;
      border-color: #40a9ff;
    }
    &.ant-btn-primary:hover > a:only-child,
    &.ant-btn-primary:focus > a:only-child {
      color: currentColor;
    }
    &.ant-btn-primary:hover > a:only-child::after,
    &.ant-btn-primary:focus > a:only-child::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: transparent;
      content: '';
    }
    &.ant-btn-primary:active {
      color: #fff;
      background: #096dd9;
      border-color: #096dd9;
    }
    &.ant-btn-primary:active > a:only-child {
      color: currentColor;
    }
    &.ant-btn-primary:active > a:only-child::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: transparent;
      content: '';
    }
    &.ant-btn-primary[disabled],
    &.ant-btn-primary[disabled]:hover,
    &.ant-btn-primary[disabled]:focus,
    &.ant-btn-primary[disabled]:active {
      color: rgba(0, 0, 0, 0.25);
      background: #f5f5f5;
      border-color: #d9d9d9;
      text-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
    }
    &.ant-btn-primary[disabled] > a:only-child,
    &.ant-btn-primary[disabled]:hover > a:only-child,
    &.ant-btn-primary[disabled]:focus > a:only-child,
    &.ant-btn-primary[disabled]:active > a:only-child {
      color: currentColor;
    }
    &.ant-btn-primary[disabled] > a:only-child::after,
    &.ant-btn-primary[disabled]:hover > a:only-child::after,
    &.ant-btn-primary[disabled]:focus > a:only-child::after,
    &.ant-btn-primary[disabled]:active > a:only-child::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: transparent;
      content: '';
    }
  `;
};

export default buttonStyle;

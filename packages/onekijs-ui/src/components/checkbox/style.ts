import { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { backgroundColor } from '../../styles/background';
import { borderColor, borderRadius, borderStyle, borderWidth } from '../../styles/border';
import { display } from '../../styles/display';
import { opacity } from '../../styles/effects';
import { cursor } from '../../styles/interactivity';
import { position, top } from '../../styles/position';
import { height, width } from '../../styles/size';
import { marginLeft } from '../../styles/spacing';
import { fill, stroke } from '../../styles/svg';
import { ComponentStyle } from '../../styles/typings';
import { CheckboxProps } from './typings';

const checkboxStyle: ComponentStyle<CheckboxProps> = ({
  height: cssHeight = '20px',
  width: cssWidth = '20px',
  theme,
  color: cssColor,
  value,
  bordered = true,
}) => {
  const t = theme.checkbox;
  const checkboxColor = cssColor ?? t.color;
  const checkboxHeight = isNaN(cssHeight as any) ? `${cssHeight}` : `${cssHeight}px`;
  const checkboxWidth = isNaN(cssHeight as any) ? `${cssWidth}` : `${cssWidth}px`;

  return css`
    ${display('inline-flex')}
    ${alignItems('center')}
    .o-checkbox-container {
      ${position('relative')}
      ${height(checkboxHeight)};
      ${width(checkboxWidth)};
      ${display('inline-block')}
      ${borderWidth(bordered ? '2px' : 0)}
      ${borderStyle('solid')}
      ${borderColor(checkboxColor)}
      ${borderRadius('4px')}
    }

    .o-checkbox-input {
      ${position('absolute')}
      ${top(0)}
      ${opacity(0)}
      ${height('full')};
      ${width('full')};
      ${cursor('pointer')}
    }

    .o-checkbox-svg {
      ${position('absolute')}
      ${width('full')};
    }

    &.o-checkbox-disabled {
      .o-checkbox-container {
        ${borderColor('dark')}
      }
      .o-checkbox-svg-stroke {
        ${borderColor('dark')}
      }
      .o-checkbox-svg {
        ${backgroundColor('lighter')}
      }
      .o-checkbox-input {
        ${cursor('not-allowed')}
      }
      label {
        ${cursor('not-allowed')}
      }
      .o-checkbox-svg-stroke {
        ${stroke('dark')}
      }
    }

    .o-checkbox-svg-stroke {
      ${stroke(checkboxColor)}
      ${fill('none')}
      stroke-width: 6;
      stroke-linecap: round;
      stroke-dasharray: 100% 200%;
      stroke-dashoffset: ${() => (value ? '0' : '100%')};
      transition: stroke-dashoffset 100ms ease-in-out;
    }

    label {
      cursor: pointer;
      display: flex;
      align-items: center;
      .o-checkbox-label {
        ${marginLeft('md')}
      }
    }

    &.o-checkbox-status-error {
      .o-checkbox-container {
        ${borderColor('danger')}
      }
      .o-checkbox-svg-stroke {
        ${stroke('danger')}
      }
    }

    &.o-checkbox-status-warning {
      .o-checkbox-container {
        ${borderColor('warning')}
      }
      .o-checkbox-svg-stroke {
        ${stroke('warning')}
      }
    }

    &.o-checkbox-status-success {
      .o-checkbox-container {
        ${borderColor('success')}
      }
      .o-checkbox-svg-stroke {
        ${stroke('success')}
      }
    }
  `;
};

export default checkboxStyle;

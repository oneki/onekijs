import { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { display } from '../../styles/display';
import { cursor } from '../../styles/interactivity';
import { overflow } from '../../styles/overflow';
import { height, width } from '../../styles/size';
import { marginLeft } from '../../styles/spacing';
import { transitionProperty } from '../../styles/transition';
import { ComponentStyle } from '../../styles/typings';
import { color } from '../../styles/typography';
import { TreeProps } from './typings';

export const treeStyle: ComponentStyle<TreeProps<any>> = () => {
  return css`
    .o-tree-item {
      ${display('flex')}
      ${alignItems('center')}
      &.o-tree-item-hide {
        ${display('none')}
      }
      .o-toggler-icon-container {
        ${width(4, { hover: 4 })}
        ${height(4, { hover: 4 })}
        .o-toggler-icon {
          ${cursor('pointer')}
        }
      }
      .o-empty-icon-container {
        ${width(4)}
        ${height(4)}
      }
      .o-icon-loading-container {
        ${width(4)}
        ${height(4)}
        .o-icon-loading-svg {
          ${width(3)}
          ${height(3)}
        }
      }
      .o-icon-folder {
        ${color('primary')}
      }
      .o-tree-item-text,
      .o-tree-item-icon {
        ${marginLeft('sm')}
      }
    }
    .o-tree-item-animate-expanding,
    .o-tree-item-animate-collapsing {
      ${overflow('hidden')}
      ${transitionProperty('height,opacity')}
    }
    .o-tree-item-animate-expanding {
      ${height(0)}
    }
  `;
};

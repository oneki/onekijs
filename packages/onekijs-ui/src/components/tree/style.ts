import { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { display } from '../../styles/display';
import { cursor } from '../../styles/interactivity';
import { height, width } from '../../styles/size';
import { marginLeft } from '../../styles/spacing';
import { ComponentStyle } from '../../styles/typings';
import { color } from '../../styles/typography';
import { TreeProps } from './typings';

export const treeStyle: ComponentStyle<TreeProps<any>> = () => {
  return css`
    .o-tree-item {
      ${display('flex')}
      ${alignItems('center')}
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
      .o-icon-folder {
        ${color('primary')}
      }
      .o-tree-item-text {
        ${marginLeft('sm')}
      }
    }
  `;
};

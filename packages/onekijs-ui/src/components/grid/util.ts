import { CSSProperties } from 'react';
import { GridColumn } from './typings';

export const getCellWidth = (column: GridColumn<unknown>, fit?: boolean, grow?: string): CSSProperties => {
  const style: CSSProperties = {};
  if (column.computedWidth) {
    return column.computedWidth;
  } else {
    if (column.minWidth) {
      style.minWidth = column.minWidth;
    }

    if (column.maxWidth) {
      style.maxWidth = column.maxWidth;
    }

    console.log(grow);

    if (!grow || grow === column.id) {
      style.flexGrow = 1;
    }

    if (column.width) {
      if (fit) {
        style.width = column.width;
      } else {
        style.minWidth = column.width;
      }
    }
    return style;
  }
};

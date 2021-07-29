import React, { CSSProperties, FC, useEffect, useRef } from 'react';
import { get } from '@oneki/utils';
import { GridBodyCellProps } from '../typings';
import useGridContext from '../useGridContext';

const GridBodyCellComponent: FC<GridBodyCellProps> = ({ column, rowIndex, colId, rowValue }) => {
  const { initCell, fit, grow } = useGridContext();
  const ref = useRef<HTMLDivElement>(null);
  const initializedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!initializedRef.current && ref.current !== null) {
      initializedRef.current = initCell(rowIndex, colId, ref);
    }
  });

  const style: CSSProperties = {};
  if (column.computedWidth) {
    style.width = column.computedWidth;
  } else {
    if (!column.width.force && (column.width.auto || column.width.grow || !grow)) {
      style.flexGrow = 1;
    }
    if (column.width.value !== undefined) {
      const key = column.width.force || !fit ? 'minWidth' : 'width';
      if (column.width.force) {
        style.width = `${column.width.value}${column.width.unit || 'px'}`;
      }
      style[key] = `${column.width.value}${column.width.unit || 'px'}`;
    }
  }

  return (
    <div ref={ref} className="o-grid-body-cell" style={style}>
      {get(rowValue, `data.${colId}`)}
    </div>
  );
};

export default GridBodyCellComponent;

import React, { FC, useEffect, useRef } from 'react';
import { get } from '@oneki/utils';
import { GridBodyCellProps } from '../typings';
import useGridContext from '../useGridContext';

const GridBodyCellComponent: FC<GridBodyCellProps> = ({ column, rowIndex, colId, rowValue }) => {
  const { initCell } = useGridContext();
  const ref = useRef<HTMLDivElement>(null);
  const initializedRef = useRef<boolean>(false);

  
  useEffect(() => {
    if (!initializedRef.current && ref.current !== null) {
      initializedRef.current = initCell(rowIndex, colId, ref);
    }
  });

  return (
    <div ref={ref} className="o-grid-body-cell" style={{ width: column.width }}>
      {get(rowValue, colId)}
    </div>
  );
};

export default GridBodyCellComponent;
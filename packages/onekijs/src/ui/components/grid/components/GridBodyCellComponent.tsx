import React, { FC, useEffect, useRef } from 'react';
import { get } from '../../../../utils/object';
import { addClassname } from '../../../utils/style';
import { GridBodyCellProps } from '../typings';
import useGridContext from '../useGridContext';
import { getCellWidth } from '../util';

const GridBodyCellComponent: FC<GridBodyCellProps> = ({ column, rowIndex, rowValue }) => {
  const context = useGridContext();
  const { initCell, fit, grow } = context;
  const ref = useRef<HTMLDivElement>(null);
  const initializedRef = useRef<boolean>(false);

  const className =
    typeof column.className === 'function' ? column.className(rowValue, column, context) : column.className;

  useEffect(() => {
    if (!initializedRef.current && ref.current !== null) {
      initializedRef.current = initCell(rowIndex, column.id, ref);
    }
  });

  return (
    <div ref={ref} className={addClassname('o-grid-body-cell', className)} style={getCellWidth(column, fit, grow)}>
      {get(rowValue, `data.${column.id}`)}
    </div>
  );
};

export default GridBodyCellComponent;

import React, { FC, useEffect, useRef } from 'react';
import { addClassname } from 'utils/style';
import { GridHeaderCellProps } from '../typings';
import useGridContext from '../useGridContext';
import { getCellWidth } from '../util';

const GridHeaderCellComponent: FC<GridHeaderCellProps> = ({ column }) => {
  const context = useGridContext();
  const { initCell, fit, grow } = context;
  const ref = useRef<HTMLDivElement>(null);
  const initializedRef = useRef<boolean>(false);

  const className =
    typeof column.headerClassName === 'function' ? column.headerClassName(column, context) : column.headerClassName;

  useEffect(() => {
    if (!initializedRef.current && ref.current !== null) {
      initializedRef.current = initCell('header', column.id, ref);
    }
  });

  return (
    <div ref={ref} className={addClassname('o-grid-header-cell', className)} style={getCellWidth(column, fit, grow)}>
      {column.title}
    </div>
  );
};

export default GridHeaderCellComponent;

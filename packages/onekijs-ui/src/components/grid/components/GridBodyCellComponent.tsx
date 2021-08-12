import { get } from 'onekijs-framework';
import React, { FC, useEffect, useRef } from 'react';
import { addClassname } from '../../../utils/style';
import { GridBodyCellProps } from '../typings';
import useGridController from '../useGridController';
import { getCellWidth } from '../util';

const DefaultCellComponent: FC<GridBodyCellProps> = ({ rowValue, column }) => {
  return <>{get(rowValue, `data.${column.id}`)}</>;
};

const GridBodyCellComponent: FC<GridBodyCellProps> = React.memo((props) => {
  const { column, rowIndex, rowValue } = props;
  const controller = useGridController();
  const { initCell, fit, grow } = controller;
  const ref = useRef<HTMLDivElement>(null);
  const initializedRef = useRef<boolean>(false);
  const Component = column.CellComponent || DefaultCellComponent;

  const className =
    typeof column.className === 'function' ? column.className(rowValue, column, controller) : column.className;

  useEffect(() => {
    if (!initializedRef.current && ref.current !== null) {
      initializedRef.current = initCell(rowIndex, column.id, ref);
    }
  });

  return (
    <div ref={ref} className={addClassname('o-grid-body-cell', className)} style={getCellWidth(column, fit, grow)}>
      <Component {...props} />
    </div>
  );
});

GridBodyCellComponent.displayName = 'GridCell';

export default GridBodyCellComponent;

import { get } from 'onekijs-framework';
import React, { FC, useEffect, useRef } from 'react';
import { addClassname } from '../../../utils/style';
import { TableBodyCellProps } from '../typings';
import useTableController from '../useTableController';
import { getCellWidth } from '../util';

const DefaultCellComponent: FC<TableBodyCellProps> = ({ rowValue, column }) => {
  return <>{get(rowValue, `data.${column.id}`)}</>;
};

const TableBodyCellComponent: FC<TableBodyCellProps> = React.memo((props) => {
  const { column, rowIndex, rowValue } = props;
  const controller = useTableController();
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
    <div ref={ref} className={addClassname('o-table-body-cell', className)} style={getCellWidth(column, fit, grow)}>
      <Component {...props} />
    </div>
  );
});

TableBodyCellComponent.displayName = 'TableCell';

export default TableBodyCellComponent;

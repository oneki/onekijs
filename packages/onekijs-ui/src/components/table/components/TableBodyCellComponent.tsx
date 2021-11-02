import { get } from 'onekijs-framework';
import React, { FC, useEffect, useRef } from 'react';
import { addClassname } from '../../../utils/style';
import { TableBodyCellProps } from '../typings';
import useTableController from '../hooks/useTableController';
import { getCellWidth } from '../util';

const DefaultCellComponent: FC<TableBodyCellProps> = ({ item, column }) => {
  return <>{get(item, `data.${column.id}`)}</>;
};

const TableBodyCellComponent: FC<TableBodyCellProps> = React.memo((props) => {
  const { column, rowIndex, className } = props;
  const controller = useTableController();
  const ref = useRef<HTMLDivElement>(null);
  const initializedRef = useRef<boolean>(false);
  const Component = column.CellComponent || DefaultCellComponent;

  useEffect(() => {
    if (!initializedRef.current && ref.current !== null) {
      initializedRef.current = controller.initCell(rowIndex, column.id, ref);
    }
  });

  return (
    <div
      ref={ref}
      className={addClassname('o-table-body-cell', className)}
      style={getCellWidth(column, controller.state.fit, controller.state.grow)}
    >
      <Component {...props} />
    </div>
  );
});

TableBodyCellComponent.displayName = 'TableCell';

export default TableBodyCellComponent;

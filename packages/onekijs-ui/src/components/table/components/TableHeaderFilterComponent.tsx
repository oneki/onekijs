import React, { FC, useEffect, useRef } from 'react';
import { TableHeaderCellProps } from '../typings';
import useTableController from '../hooks/useTableController';
import { getCellWidth } from '../util';
import TableInputFilterComponent from './filters/TableInputFilterComponent';

const TableHeaderFilterComponent: FC<TableHeaderCellProps> = React.memo(({ column, filter, filterable }) => {
  const controller = useTableController();
  const { fit, grow } = controller.state;
  const ref = useRef<HTMLDivElement>(null);
  const initializedRef = useRef<boolean>(false);
  const Component = column.FilterComponent || TableInputFilterComponent;

  useEffect(() => {
    if (!initializedRef.current && ref.current !== null) {
      initializedRef.current = controller.initCell('header-filter', column.id, ref);
    }
  });

  return (
    <div className="o-table-header-filter" style={getCellWidth(column, fit, grow)} ref={ref}>
      {filterable && <Component column={column} filter={filter} />}
    </div>
  );
});

TableHeaderFilterComponent.displayName = 'TableHeaderFilter';

export default TableHeaderFilterComponent;

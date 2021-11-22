import React, { FC, useEffect, useRef } from 'react';
import { TableHeaderCellProps } from '../typings';
import useTableService from '../hooks/useTableService';
import { getCellWidth } from '../util';
import TableInputFilterComponent from './filters/TableInputFilterComponent';
import { useTableConfig } from '../hooks/useTableConfig';

const TableHeaderFilterComponent: FC<TableHeaderCellProps> = React.memo(({ column, filter, filterable }) => {
  const service = useTableService();
  const { fit, grow } = useTableConfig();
  const ref = useRef<HTMLDivElement>(null);
  const initializedRef = useRef<boolean>(false);
  const Component = column.FilterComponent || TableInputFilterComponent;

  useEffect(() => {
    if (!initializedRef.current && ref.current !== null) {
      initializedRef.current = service.initCell('header-filter', column.id, ref);
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

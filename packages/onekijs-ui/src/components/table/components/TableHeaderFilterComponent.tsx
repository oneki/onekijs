import React, { FC, useEffect, useRef } from 'react';
import { useTableConfig } from '../hooks/useTableConfig';
import useTableService from '../hooks/useTableService';
import { TableHeaderCellProps } from '../typings';
import { getCellWidth } from '../util';
import TableTextFilterComponent from './filters/TableTextFilterComponent';

const TableHeaderFilterComponent: FC<TableHeaderCellProps> = React.memo((props) => {
  const { column, filterable } = props;
  const service = useTableService();
  const { fit, grow } = useTableConfig();
  const ref = useRef<HTMLDivElement>(null);
  const initializedRef = useRef<boolean>(false);
  const Component = column.FilterComponent || TableTextFilterComponent;

  useEffect(() => {
    if (!initializedRef.current && ref.current !== null) {
      service.initCell('header-filter', column.id, ref);
    }
  });

  return (
    <div className="o-table-header-filter" style={getCellWidth(column, fit, grow)} ref={ref}>
      {filterable && <Component {...props} />}
    </div>
  );
});

TableHeaderFilterComponent.displayName = 'TableHeaderFilter';

export default TableHeaderFilterComponent;

import React, { FC, useEffect, useRef } from 'react';
import { addClassname } from '../../../utils/style';
import { TableHeaderCellProps } from '../typings';
import useTableController from '../useTableController';
import { getCellWidth } from '../util';
import TableSortComponent from './TableSortComponent';

export const DefaultTableHeaderTitleComponent: FC<TableHeaderCellProps> = ({ column, sort }) => {
  const { sortable, sortBy } = useTableController();
  const isSortable = column.sortable || (column.sortable === undefined && sortable !== false);
  const onSort = () => {
    if (isSortable) {
      sortBy({
        id: column.id,
        field: column.id,
        dir: sort && sort.dir !== 'desc' ? 'desc' : 'asc',
      });
    }
  };

  return (
    <div onClick={isSortable ? onSort : undefined} style={{ display: 'flex', alignItems: 'center' }}>
      <span className="o-table-header-title">{column.title}</span>
      {isSortable && <TableSortComponent sort={sort} column={column} />}
    </div>
  );
};

const TableHeaderTitleComponent: FC<TableHeaderCellProps> = React.memo((props) => {
  const { column, sortable } = props;
  const controller = useTableController();
  const { initCell, fit, grow } = controller;
  const ref = useRef<HTMLDivElement>(null);
  const initializedRef = useRef<boolean>(false);

  const className =
    typeof column.headerClassName === 'function' ? column.headerClassName(column, controller) : column.headerClassName;

  const Component = column.HeaderComponent || DefaultTableHeaderTitleComponent;

  useEffect(() => {
    if (!initializedRef.current && ref.current !== null) {
      initializedRef.current = initCell('header-title', column.id, ref);
    }
  });

  return (
    <div
      className={addClassname(`o-table-header-title-container${sortable ? ' o-table-header-sortable' : ''}`, className)}
      style={getCellWidth(column, fit, grow)}
      ref={ref}
    >
      <Component {...props} />
    </div>
  );
});

TableHeaderTitleComponent.displayName = 'TableHeaderTitle';

export default TableHeaderTitleComponent;
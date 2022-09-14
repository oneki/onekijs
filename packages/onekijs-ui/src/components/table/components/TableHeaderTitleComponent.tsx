import React, { FC, useEffect, useRef } from 'react';
import { addClassname } from '../../../utils/style';
import FieldHelp from '../../field/FieldHelp';
import { useTableConfig } from '../hooks/useTableConfig';
import useTableService from '../hooks/useTableService';
import { TableHeaderCellProps } from '../typings';
import { getCellWidth } from '../util';
import TableSortComponent from './TableSortComponent';

export const DefaultTableHeaderTitleComponent: FC<TableHeaderCellProps> = ({ column, sort }) => {
  const service = useTableService();
  const { sortable } = useTableConfig();
  const isSortable = column.sortable || (column.sortable === undefined && sortable !== false);
  const onSort = () => {
    if (isSortable) {
      service.sortBy({
        id: column.id,
        field: column.id,
        dir: sort && sort.dir !== 'desc' ? 'desc' : 'asc',
      });
    }
  };

  return (
    <div onClick={isSortable ? onSort : undefined} style={{ display: 'flex', alignItems: 'center' }}>
      <span className="o-table-header-title">{column.title}</span>
      {column.help && <FieldHelp content={column.help} size="small" />}
      {isSortable && <TableSortComponent sort={sort} column={column} />}
    </div>
  );
};

const TableHeaderTitleComponent: FC<TableHeaderCellProps> = React.memo((props) => {
  const { column, sortable } = props;
  const service = useTableService();
  const { fit, grow } = useTableConfig();
  const ref = useRef<HTMLDivElement>(null);
  const initializedRef = useRef<boolean>(false);

  const className =
    typeof column.headerClassName === 'function' ? column.headerClassName(column) : column.headerClassName;

  const Component = column.TitleComponent || DefaultTableHeaderTitleComponent;

  useEffect(() => {
    if (!initializedRef.current && ref.current !== null) {
      service.initCell('header-title', column.id, ref);
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

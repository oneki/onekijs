import React, { CSSProperties } from 'react';
import { addClassname } from '../../../utils/style';
import { TableHeaderProps } from '../typings';
import TableHeaderTitleComponent from './TableHeaderTitleComponent';
import TableHeaderFilterComponent from './TableHeaderFilterComponent';
import useTableService from '../hooks/useTableService';
import { useTableConfig } from '../hooks/useTableConfig';

const TableHeaderComponent: React.FC<TableHeaderProps> = ({ columns, className }) => {
  const headerStyle: CSSProperties = {
    display: 'flex',
  };

  const service = useTableService();
  const { fixHeader = true, filterable, sortable, height } = useTableConfig();

  if (fixHeader && height) {
    headerStyle.position = 'sticky';
    headerStyle.top = 0;
    headerStyle.zIndex = 1;
  }

  const hasFilter: boolean = columns
    .map((c) => c.filterable || (c.filterable === undefined && filterable !== false))
    .reduce((accumulator, filterable) => accumulator || filterable, false);

  return (
    <div
      className={addClassname(`o-table-header${hasFilter ? ' o-table-header-filterable' : ''}`, className)}
      style={headerStyle}
    >
      <div className="o-table-header-row-title">
        {columns.map((column, colIndex) => {
          const isFilterable = column.filterable || (column.filterable === undefined && filterable !== false);
          const isSortable = column.sortable || (column.sortable === undefined && sortable !== false);
          const filter = service.getFilterById(column.id);
          const sort = service.getSortById(column.id);
          const cellClassName =
            typeof column.headerClassName === 'function' ? column.headerClassName(column) : column.headerClassName;
          return (
            <TableHeaderTitleComponent
              column={column}
              filter={filter}
              filterable={isFilterable}
              sort={sort}
              sortable={isSortable}
              colIndex={colIndex}
              key={`header-cell-title-${colIndex}`}
              className={cellClassName}
            />
          );
        })}
      </div>
      {hasFilter && (
        <div className="o-table-header-row-filter">
          {columns.map((column, colIndex) => {
            const isFilterable = column.filterable || (column.filterable === undefined && filterable !== false);
            const isSortable = column.sortable || (column.sortable === undefined && sortable !== false);
            const filter = service.getFilterById(column.id);
            const sort = service.getSortById(column.id);
            return (
              <TableHeaderFilterComponent
                column={column}
                filter={filter}
                filterable={isFilterable}
                sort={sort}
                sortable={isSortable}
                colIndex={colIndex}
                key={`header-cell-filter-${colIndex}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

TableHeaderComponent.displayName = 'TableHeader';

export default TableHeaderComponent;

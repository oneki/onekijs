import React, { CSSProperties } from 'react';
import { addClassname } from '../../../utils/style';
import { TableHeaderProps } from '../typings';
import TableHeaderTitleComponent from './TableHeaderTitleComponent';
import TableHeaderFilterComponent from './TableHeaderFilterComponent';

const TableHeaderComponent: React.FC<TableHeaderProps> = ({ controller }) => {
  const headerStyle: CSSProperties = {
    display: 'flex',
  };

  if (controller.fixHeader) {
    headerStyle.position = 'sticky';
    headerStyle.top = 0;
    headerStyle.zIndex = 1;
  }

  const hasFilter: boolean = controller.columns
    .map((c) => c.filterable || (c.filterable === undefined && controller.filterable !== false))
    .reduce((accumulator, filterable) => accumulator || filterable, false);

  const className =
    typeof controller.headerClassName === 'function'
      ? controller.headerClassName(controller)
      : controller.headerClassName;

  return (
    <div
      className={addClassname(`o-table-header${hasFilter ? ' o-table-header-filterable' : ''}`, className)}
      style={headerStyle}
    >
      <div className="o-table-header-row-title">
        {controller.columns.map((column, colIndex) => {
          const filterable = column.filterable || (column.filterable === undefined && controller.filterable !== false);
          const sortable = column.sortable || (column.sortable === undefined && controller.sortable !== false);
          const filter = controller.getFilterById(column.id);
          const sort = controller.getSortById(column.id);
          return (
            <TableHeaderTitleComponent
              column={column}
              filter={filter}
              filterable={filterable}
              sort={sort}
              sortable={sortable}
              colIndex={colIndex}
              key={`header-cell-title-${colIndex}`}
            />
          );
        })}
      </div>
      {hasFilter && (
        <div className="o-table-header-row-filter">
          {controller.columns.map((column, colIndex) => {
            const filterable =
              column.filterable || (column.filterable === undefined && controller.filterable !== false);
            const sortable = column.sortable || (column.sortable === undefined && controller.sortable !== false);
            const filter = controller.getFilterById(column.id);
            const sort = controller.getSortById(column.id);
            return (
              <TableHeaderFilterComponent
                column={column}
                filter={filter}
                filterable={filterable}
                sort={sort}
                sortable={sortable}
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

import React, { FC, useState } from 'react';
import { addClassname } from '../../../utils/style';
import { useTableConfig } from '../hooks/useTableConfig';
import { TableBodyRowProps } from '../typings';
import TableBodyCellComponent from './TableBodyCellComponent';

const TableBodyRowComponent: FC<TableBodyRowProps> = ({
  item,
  index,
  columns,
  CellComponent = TableBodyCellComponent,
  className,
}) => {
  const [hover, setHover] = useState(false);
  const { highlightRow, stripRows } = useTableConfig();

  if (item === undefined) {
    return null;
  }

  const rowClassName = addClassname(
    `o-table-body-row${hover ? ' o-table-body-row-hover' : ''}${
      stripRows ? ` o-table-body-row-${index % 2 === 0 ? 'even' : 'odd'}` : ''
    }`,
    className,
  );

  return (
    <div
      className={rowClassName}
      onMouseEnter={highlightRow ? () => setHover(true) : undefined}
      onMouseLeave={highlightRow ? () => setHover(false) : undefined}
      style={{ display: 'flex' }}
    >
      {columns.map((column, colIndex) => {
        const cellClassName =
          typeof column.className === 'function' ? column.className(item, column, index) : column.className;
        return (
          <CellComponent
            column={column}
            colIndex={colIndex}
            rowIndex={index}
            rowId={item.id}
            item={item}
            key={`cell-${colIndex}`}
            className={cellClassName}
          />
        );
      })}
    </div>
  );
};

export default TableBodyRowComponent;

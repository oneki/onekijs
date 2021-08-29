import React, { FC } from 'react';
import { useState } from 'react';
import { TableBodyRowProps } from '../typings';
import useTableController from '../useTableController';
import TableBodyCellComponent from './TableBodyCellComponent';

const TableBodyRowComponent: FC<TableBodyRowProps> = ({
  item,
  index,
  columns,
  CellComponent = TableBodyCellComponent,
}) => {
  const [hover, setHover] = useState(false);
  const { highlightRow, stripRows } = useTableController();

  if (item === undefined) {
    return null;
  }

  return (
    <div
      className={`o-table-body-row${hover ? ' o-table-body-row-hover' : ''}${
        stripRows ? ` o-table-body-row-${index % 2 === 0 ? 'even' : 'odd'}` : ''
      }`}
      onMouseEnter={highlightRow ? () => setHover(true) : undefined}
      onMouseLeave={highlightRow ? () => setHover(false) : undefined}
      style={{ display: 'flex' }}
    >
      {columns.map((column, colIndex) => {
        return (
          <CellComponent
            column={column}
            colIndex={colIndex}
            rowIndex={index}
            rowId={item.id}
            rowValue={item}
            key={`cell-${colIndex}`}
          />
        );
      })}
    </div>
  );
};

export default TableBodyRowComponent;

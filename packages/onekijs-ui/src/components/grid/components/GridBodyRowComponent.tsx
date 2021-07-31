import React, { FC } from 'react';
import { GridBodyRowProps } from '../typings';
import GridBodyCellComponent from './GridBodyCellComponent';

const GridBodyRowComponent: FC<GridBodyRowProps> = ({
  item,
  index,
  columns,
  CellComponent = GridBodyCellComponent,
}) => {
  if (item === undefined) {
    return null;
  }
  return (
    <div className="o-grid-body-row" style={{ display: 'flex' }}>
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

export default GridBodyRowComponent;

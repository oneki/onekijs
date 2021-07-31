import React, { CSSProperties } from 'react';
import { addStyle } from 'utils/style';
import { GridHeaderProps } from '../typings';
import useGridContext from '../useGridContext';
import GridHeaderCellComponent from './GridHeaderCellComponent';

const GridHeaderComponent: React.FC<GridHeaderProps> = ({ className, columns, style }) => {
  const { fixHeader } = useGridContext();
  const headerStyle: CSSProperties = {
    display: 'flex',
  };

  if (fixHeader) {
    headerStyle.position = 'sticky';
    headerStyle.top = 0;
    headerStyle.zIndex = 1;
    headerStyle.background = 'gray';
  }

  return (
    <div className={className} style={addStyle(headerStyle, style)}>
      {columns.map((column, colIndex) => {
        const Component = column.HeaderComponent || GridHeaderCellComponent;
        return <Component column={column} colIndex={colIndex} key={`header-cell-${colIndex}`} />;
      })}
    </div>
  );
};

GridHeaderComponent.displayName = 'GridHeader';

export default GridHeaderComponent;

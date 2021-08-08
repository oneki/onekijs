import React, { CSSProperties } from 'react';
import { addClassname } from '../../../utils/style';
import { GridHeaderProps } from '../typings';
import GridHeaderCellComponent from './GridHeaderCellComponent';

const GridHeaderComponent: React.FC<GridHeaderProps> = ({ controller }) => {
  const headerStyle: CSSProperties = {
    display: 'flex',
  };

  if (controller.fixHeader) {
    headerStyle.position = 'sticky';
    headerStyle.top = 0;
    headerStyle.zIndex = 1;
  }

  const className =
    typeof controller.headerClassName === 'function'
      ? controller.headerClassName(controller)
      : controller.headerClassName;

  return (
    <div className={addClassname('o-grid-header', className)} style={headerStyle}>
      {controller.columns.map((column, colIndex) => {
        const Component = column.HeaderComponent || GridHeaderCellComponent;
        const filter = controller.getFilterById(column.id);
        const sort = controller.getSortById(column.id);
        return (
          <Component column={column} filter={filter} sort={sort} colIndex={colIndex} key={`header-cell-${colIndex}`} />
        );
      })}
    </div>
  );
};

GridHeaderComponent.displayName = 'GridHeader';

export default GridHeaderComponent;

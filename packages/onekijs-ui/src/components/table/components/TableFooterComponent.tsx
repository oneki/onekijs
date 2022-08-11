import React, { CSSProperties } from 'react';
import { addClassname } from '../../../utils/style';
import { TableFooterProps } from '../typings';
import TableFooterCellComponent from './TableFooterCellComponent';

const TableFooterComponent: React.FC<TableFooterProps> = ({ className, columns }) => {
  const footerStyle: CSSProperties = {
    display: 'flex',
  };

  if (true) {
    //TODO change to fixFooter
    footerStyle.position = 'sticky';
    footerStyle.bottom = 0;
    footerStyle.zIndex = 1;
  }

  return (
    <div className={addClassname('o-table-footer', className)} style={footerStyle}>
      {columns.map((column, colIndex) => {
        const cellClassName =
          typeof column.footerClassName === 'function' ? column.footerClassName(column) : column.footerClassName;
        const Component = column.FooterComponent || TableFooterCellComponent;
        return (
          <Component column={column} colIndex={colIndex} className={cellClassName} key={`header-cell-${colIndex}`} />
        );
      })}
    </div>
  );
};

TableFooterComponent.displayName = 'TableFooter';

export default TableFooterComponent;

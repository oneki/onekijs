import React, { CSSProperties } from 'react';
import { addClassname } from '../../../utils/style';
import { TableFooterProps } from '../typings';
import TableFooterCellComponent from './TableFooterCellComponent';

const TableFooterComponent: React.FC<TableFooterProps> = ({ controller }) => {
  const footerStyle: CSSProperties = {
    display: 'flex',
  };

  if (true) {
    //TODO change to fixFooter
    footerStyle.position = 'sticky';
    footerStyle.bottom = 0;
    footerStyle.zIndex = 1;
  }

  const className =
    typeof controller.footerClassName === 'function'
      ? controller.footerClassName(controller)
      : controller.footerClassName;

  return (
    <div className={addClassname('o-table-footer', className)} style={footerStyle}>
      {controller.columns.map((column, colIndex) => {
        const Component = column.FooterComponent || TableFooterCellComponent;
        return <Component column={column} colIndex={colIndex} key={`header-cell-${colIndex}`} />;
      })}
    </div>
  );
};

TableFooterComponent.displayName = 'TableFooter';

export default TableFooterComponent;

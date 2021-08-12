import React, { CSSProperties } from 'react';
import { addClassname } from '../../../utils/style';
import { GridFooterProps } from '../typings';
import GridFooterCellComponent from './GridFooterCellComponent';

const GridFooterComponent: React.FC<GridFooterProps> = ({ controller }) => {
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
    <div className={addClassname('o-grid-footer', className)} style={footerStyle}>
      {controller.columns.map((column, colIndex) => {
        const Component = column.FooterComponent || GridFooterCellComponent;
        return <Component column={column} colIndex={colIndex} key={`header-cell-${colIndex}`} />;
      })}
    </div>
  );
};

GridFooterComponent.displayName = 'GridFooter';

export default GridFooterComponent;

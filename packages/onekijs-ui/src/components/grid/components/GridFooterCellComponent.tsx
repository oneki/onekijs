import React, { FC, useEffect, useRef } from 'react';
import { addClassname } from '../../../utils/style';
import { GridFooterCellProps } from '../typings';
import useGridController from '../useGridController';
import { getCellWidth } from '../util';

const GridFooterCellComponent: FC<GridFooterCellProps> = React.memo(({ column }) => {
  const controller = useGridController();
  const { initCell, fit, grow } = controller;
  const ref = useRef<HTMLDivElement>(null);
  const initializedRef = useRef<boolean>(false);

  const className =
    typeof column.footerClassName === 'function' ? column.footerClassName(column, controller) : column.footerClassName;

  useEffect(() => {
    if (!initializedRef.current && ref.current !== null) {
      initializedRef.current = initCell('footer', column.id, ref);
    }
  });

  return <div className={addClassname('o-grid-footer-cell', className)} style={getCellWidth(column, fit, grow)}></div>;
});

GridFooterCellComponent.displayName = 'GridFooterCell';

export default GridFooterCellComponent;

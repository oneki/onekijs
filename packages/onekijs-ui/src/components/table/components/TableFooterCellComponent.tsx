import React, { FC, useEffect, useRef } from 'react';
import { addClassname } from '../../../utils/style';
import { TableFooterCellProps } from '../typings';
import useTableController from '../hooks/useTableController';
import { getCellWidth } from '../util';

const TableFooterCellComponent: FC<TableFooterCellProps> = React.memo(({ column }) => {
  const controller = useTableController();
  const { fit, grow } = controller.state;
  const ref = useRef<HTMLDivElement>(null);
  const initializedRef = useRef<boolean>(false);

  const className =
    typeof column.footerClassName === 'function' ? column.footerClassName(column) : column.footerClassName;

  useEffect(() => {
    if (!initializedRef.current && ref.current !== null) {
      initializedRef.current = controller.initCell('footer', column.id, ref);
    }
  });

  return <div className={addClassname('o-table-footer-cell', className)} style={getCellWidth(column, fit, grow)}></div>;
});

TableFooterCellComponent.displayName = 'TableFooterCell';

export default TableFooterCellComponent;

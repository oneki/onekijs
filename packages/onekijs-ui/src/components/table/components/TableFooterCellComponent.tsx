import React, { FC, useEffect, useRef } from 'react';
import { addClassname } from '../../../utils/style';
import { useTableConfig } from '../hooks/useTableConfig';
import useTableService from '../hooks/useTableService';
import { TableFooterCellProps } from '../typings';
import { getCellWidth } from '../util';

const TableFooterCellComponent: FC<TableFooterCellProps> = React.memo(({ column }) => {
  const service = useTableService();
  const { fit, grow } = useTableConfig();
  const ref = useRef<HTMLDivElement>(null);
  const initializedRef = useRef<boolean>(false);

  const className =
    typeof column.footerClassName === 'function' ? column.footerClassName(column) : column.footerClassName;

  useEffect(() => {
    if (!initializedRef.current && ref.current !== null) {
      service.initCell('footer', column.id, ref);
    }
  });

  return <div className={addClassname('o-table-footer-cell', className)} style={getCellWidth(column, fit, grow)}></div>;
});

TableFooterCellComponent.displayName = 'TableFooterCell';

export default TableFooterCellComponent;

import { get } from 'onekijs-framework';
import React, { FC, useEffect, useRef } from 'react';
import { addClassname } from '../../../utils/style';
import { useTableConfig } from '../hooks/useTableConfig';
import useTableService from '../hooks/useTableService';
import { TableBodyCellProps } from '../typings';
import { getCellWidth } from '../util';

const DefaultCellComponent: FC<TableBodyCellProps> = ({ item, column }) => {
  return <>{get(item, `data.${column.id}`)}</>;
};

const TableBodyCellComponent: FC<Omit<TableBodyCellProps, 'data'>> = React.memo((props) => {
  const { column, rowIndex, className } = props;
  const service = useTableService();
  const { fit, grow } = useTableConfig();
  const ref = useRef<HTMLDivElement>(null);
  const initializedRef = useRef<boolean>(false);
  const Component = column.CellComponent || DefaultCellComponent;
  const ErrorBoundaryComponent = column.ErrorBoundaryComponent;

  useEffect(() => {
    if (!initializedRef.current && ref.current !== null) {
      service.initCell(rowIndex, column.id, ref);
    }
  });

  return (
    <div ref={ref} className={addClassname('o-table-body-cell', className)} style={getCellWidth(column, fit, grow)}>
      {props.item && ErrorBoundaryComponent && <ErrorBoundaryComponent {...props} data={props.item?.data}><Component {...props} data={props.item.data} /></ErrorBoundaryComponent>}
      {props.item && !ErrorBoundaryComponent && <Component {...props} data={props.item.data} />}
    </div>
  )
});

TableBodyCellComponent.displayName = 'TableCell';

export default TableBodyCellComponent;

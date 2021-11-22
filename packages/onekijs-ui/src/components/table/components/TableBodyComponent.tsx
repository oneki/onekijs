import { useLazyRef } from 'onekijs-framework';
import React from 'react';
import { addClassname } from '../../../utils/style';
import ListBodyComponent from '../../list/components/ListBodyComponent';
import useListView from '../../list/hooks/useListView';
import { ListItemProps } from '../../list/typings';
import useTableColumns from '../hooks/useTableColumns';
import { useTableConfig } from '../hooks/useTableConfig';
import useTableService from '../hooks/useTableService';
import { TableBodyProps } from '../typings';
import TableBodyRowComponent from './TableBodyRowComponent';

const TableBodyComponent: React.FC<TableBodyProps> = ({ className, tableRef, contentRef }) => {
  const service = useTableService();
  const {
    height,
    onRowClick,
    onRowEnter,
    onRowLeave,
    onRowOut,
    onRowOver,
    RowComponent = TableBodyRowComponent,
    rowClassName,
  } = useTableConfig();

  const { items, isVirtual, totalSize, virtualItems } = useListView({
    dataSource: service,
    height: height,
    ref: tableRef,
    overscan: service.step === 'mounted' ? 1 : 20,
  });

  const ItemComponentRef = useLazyRef<React.FC<ListItemProps<any, any>>>(() => {
    const Component = (props: ListItemProps<any, any>) => {
      const columns = useTableColumns();
      const className =
        typeof rowClassName === 'function' ? rowClassName(props.item, props.index, columns) : rowClassName;
      return <RowComponent {...props} columns={columns} className={className} />;
    };
    Component.displayName = 'TableBodyRow';
    return Component;
  });

  return (
    <ListBodyComponent
      className={addClassname('o-table-body', className)}
      height={height}
      ItemComponent={ItemComponentRef.current}
      items={items}
      onItemClick={onRowClick}
      onItemMouseEnter={onRowEnter}
      onItemMouseLeave={onRowLeave}
      onItemMouseOut={onRowOut}
      onItemMouseOver={onRowOver}
      parentRef={tableRef}
      bodyRef={contentRef}
      totalSize={totalSize}
      virtualItems={isVirtual ? virtualItems : undefined}
    />
  );
};
TableBodyComponent.displayName = 'TableBody';

export default TableBodyComponent;

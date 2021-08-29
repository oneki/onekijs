import React from 'react';
import { useLazyRef } from 'onekijs';
import { addClassname } from '../../../utils/style';
import ListBodyComponent from '../../list/components/ListBodyComponent';
import useListView from '../../list/hooks/useListView';
import { ListItemProps } from '../../list/typings';
import { TableBodyProps } from '../typings';
import useTableColumns from '../useTableColumns';
import TableBodyRowComponent from './TableBodyRowComponent';

const TableBodyComponent: React.FC<TableBodyProps> = ({ controller, tableRef, contentRef }) => {
  const {
    bodyClassName,
    onRowClick,
    onRowEnter,
    onRowLeave,
    onRowOut,
    onRowOver,
    RowComponent = TableBodyRowComponent,
    step,
  } = controller;

  const className = typeof bodyClassName === 'function' ? bodyClassName(controller) : bodyClassName;

  const { items, isVirtual, totalSize, virtualItems } = useListView({
    collection: controller,
    height: controller.height,
    ref: tableRef,
    overscan: step === 'mounted' ? 1 : 20,
  });

  const ItemComponentRef = useLazyRef<React.FC<ListItemProps<any, any>>>(() => {
    const Component = (props: ListItemProps<any, any>) => {
      const columns = useTableColumns();
      return <RowComponent {...props} columns={columns} />;
    };
    Component.displayName = 'TableBodyRow';
    return Component;
  });

  return (
    <ListBodyComponent
      className={addClassname('o-table-body', className)}
      height={controller.height}
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

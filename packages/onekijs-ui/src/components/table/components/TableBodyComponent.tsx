import React from 'react';
import { useLazyRef } from 'onekijs-framework';
import { addClassname } from '../../../utils/style';
import ListBodyComponent from '../../list/components/ListBodyComponent';
import useListView from '../../list/hooks/useListView';
import { ListItemProps } from '../../list/typings';
import { TableBodyProps } from '../typings';
import useTableColumns from '../hooks/useTableColumns';
import TableBodyRowComponent from './TableBodyRowComponent';
import useTableController from '../hooks/useTableController';

const TableBodyComponent: React.FC<TableBodyProps> = ({ className, tableRef, contentRef }) => {
  const controller = useTableController();
  const {
    height,
    onRowClick,
    onRowEnter,
    onRowLeave,
    onRowOut,
    onRowOver,
    RowComponent = TableBodyRowComponent,
  } = controller.state;

  const { items, isVirtual, totalSize, virtualItems } = useListView({
    collection: controller,
    height: height,
    ref: tableRef,
    overscan: controller.step === 'mounted' ? 1 : 20,
  });

  const ItemComponentRef = useLazyRef<React.FC<ListItemProps<any, any>>>(() => {
    const Component = (props: ListItemProps<any, any>) => {
      const columns = useTableColumns();
      const { rowClassName } = useTableController().state;
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

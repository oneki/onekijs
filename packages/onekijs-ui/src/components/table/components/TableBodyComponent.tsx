import { useLazyRef } from 'onekijs-framework';
import React, { useCallback, useRef } from 'react';
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
    RowComponent = TableBodyRowComponent,
    rowClassName,
  } = useTableConfig();

  const itemHeight = useCallback(() => {
    return 20;
  }, []);

  const previousItemHeightRef = useRef(itemHeight);
  previousItemHeightRef.current = itemHeight;

  const scrollToFn = React.useCallback((offset, defaultScrollTo) => {
    console.log(offset, defaultScrollTo);
  }, []);

  const { items, isVirtual, totalSize, virtualItems, measure } = useListView({
    dataSource: service,
    height: height,
    ref: tableRef,
    overscan: service.step === 'mounted' ? 1 : 20,
    itemHeight,
    scrollToFn,
  });

  const ItemComponentRef = useLazyRef<React.FC<ListItemProps<any, any>>>(() => {
    const Component = (props: ListItemProps<any, any>) => {
      const columns = useTableColumns();
      const className =
        typeof rowClassName === 'function' ? rowClassName(props.item, props.index, columns) : rowClassName;
      return (
        <RowComponent
          {...props}
          columns={columns}
          className={className}
          onExpand={measure}
          onExpanding={measure}
          onExpanded={measure}
          onCollapse={measure}
          onCollapsed={measure}
          onCollapsing={measure}
        />
      );
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
      onItemSelect={onRowClick}
      onItemHighlight={onRowEnter}
      onItemUnhighlight={onRowLeave}
      parentRef={tableRef}
      bodyRef={contentRef}
      totalSize={totalSize}
      virtualItems={isVirtual ? virtualItems : undefined}
    />
  );
};
TableBodyComponent.displayName = 'TableBody';

export default TableBodyComponent;

import { LoadingStatus, useLazyRef } from 'onekijs-framework';
import React, { useCallback } from 'react';
import { addClassname } from '../../../utils/style';
import ListBodyComponent from '../../list/components/ListBodyComponent';
import useListView from '../../list/hooks/useListView';
import { ListItemProps } from '../../list/typings';
import useTableColumns from '../hooks/useTableColumns';
import { useTableConfig } from '../hooks/useTableConfig';
import useTableService from '../hooks/useTableService';
import { useTableState } from '../hooks/useTableState';
import { TableBodyProps } from '../typings';
import TableBodyRowComponent from './TableBodyRowComponent';
import TableLoadingComponent from './TableLoadingComponent';
import TableNotFoundComponent from './TableNotFoundComponent';

const TableBodyComponent: React.FC<TableBodyProps> = ({ className, tableRef, contentRef }) => {
  const service = useTableService();
  const state = useTableState();
  const {
    autoRefresh,
    follow,
    height,
    increment,
    onRowClick,
    onRowEnter,
    onRowLeave,
    paddingEnd,
    paddingStart,
    parentRef,
    preload,
    RowComponent = TableBodyRowComponent,
    rowClassName,
    LoadingComponent = TableLoadingComponent,
    NotFoundComponent = TableNotFoundComponent,
    tail,
  } = useTableConfig();

  const itemHeight = useCallback(() => {
    return 20;
  }, []);
  const { items, isVirtual, totalSize, virtualItems, measure, scrollToIndex } = useListView({
    controller: service,
    height: height,
    ref: parentRef || tableRef,
    overscan: 10,
    itemHeight,
    paddingEnd,
    paddingStart,
    preload,
    increment,
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

  if (service.status === LoadingStatus.Loading) {
    return <LoadingComponent />;
  }

  if (service.status === LoadingStatus.Loaded && items.length === 0 && NotFoundComponent) {
    return <NotFoundComponent />;
  }

  return (
    <ListBodyComponent
      autoRefresh={autoRefresh}
      className={addClassname('o-table-body', className)}
      follow={follow}
      height={height}
      ItemComponent={ItemComponentRef.current}
      items={items}
      onItemSelect={onRowClick}
      onItemHighlight={onRowEnter}
      onItemUnhighlight={onRowLeave}
      parentRef={parentRef || tableRef}
      bodyRef={contentRef}
      service={service}
      state={state}
      totalSize={totalSize}
      tail={tail}
      virtualItems={isVirtual ? virtualItems : undefined}
      scrollToIndex={scrollToIndex}
    />
  );
};
TableBodyComponent.displayName = 'TableBody';

export default TableBodyComponent;

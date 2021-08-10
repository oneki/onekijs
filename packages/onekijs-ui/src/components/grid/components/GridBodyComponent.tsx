import React from 'react';
import { addClassname } from '../../../utils/style';
import ListBodyComponent from '../../list/components/ListBodyComponent';
import useListView from '../../list/hooks/useListView';
import { ListItemProps } from '../../list/typings';
import { GridBodyProps } from '../typings';
import GridBodyRowComponent from './GridBodyRowComponent';

const GridBodyComponent: React.FC<GridBodyProps> = ({ controller, gridRef, contentRef }) => {
  const {
    bodyClassName,
    columns,
    onRowClick,
    onRowEnter,
    onRowLeave,
    onRowOut,
    onRowOver,
    RowComponent = GridBodyRowComponent,
    step,
  } = controller;

  const className = typeof bodyClassName === 'function' ? bodyClassName(controller) : bodyClassName;

  const { items, isVirtual, totalSize, virtualItems } = useListView({
    collection: controller,
    height: controller.height,
    ref: gridRef,
    overscan: step === 'mounted' ? 1 : 20,
  });

  const ItemComponent: React.FC<ListItemProps<any, any>> = (props) => {
    return <RowComponent {...props} columns={columns} />;
  };

  return (
    <ListBodyComponent
      className={addClassname('o-grid-body', className)}
      height={controller.height}
      ItemComponent={ItemComponent}
      items={items}
      onItemClick={onRowClick}
      onItemMouseEnter={onRowEnter}
      onItemMouseLeave={onRowLeave}
      onItemMouseOut={onRowOut}
      onItemMouseOver={onRowOver}
      parentRef={gridRef}
      bodyRef={contentRef}
      totalSize={totalSize}
      virtualItems={isVirtual ? virtualItems : undefined}
    />
  );
};
GridBodyComponent.displayName = 'GridBody';

export default GridBodyComponent;

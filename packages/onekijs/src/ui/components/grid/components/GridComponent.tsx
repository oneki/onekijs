import React, { useEffect, useRef } from 'react';
import { addClassname } from '../../../utils/style';
import ListBodyComponent from '../../list/components/ListBodyComponent';
import useListView from '../../list/hooks/useListView';
import { ListBodyProps, ListHeaderProps, ListItemProps } from '../../list/typings';
import { GridBodyRowProps, GridItemMeta, GridProps } from '../typings';
import { GridColumnsContext } from '../useGridColumns';
import { GridContext } from '../useGridController';
import { GridValueContext } from '../useGridValue';
import GridBodyRowComponent from './GridBodyRowComponent';
import GridHeaderComponent from './GridHeaderComponent';

const GridComponent: React.FC<GridProps> = ({ controller, className }) => {
  const classNames = addClassname('o-grid', className);

  const contentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const bodyClassName =
    typeof controller.bodyClassName === 'function' ? controller.bodyClassName(controller) : controller.bodyClassName;
  const headerClassName =
    typeof controller.headerClassName === 'function'
      ? controller.headerClassName(controller)
      : controller.headerClassName;
  // const footerClassName =
  //   typeof controller.headerClassName === 'function' ? controller.headerClassName(controller) : controller.headerClassName;

  const BodyComponent = (controller.BodyComponent || ListBodyComponent) as React.FC<ListBodyProps<any, GridItemMeta>>;
  const RowComponent = (controller.RowComponent || GridBodyRowComponent) as React.FC<
    GridBodyRowProps<any, GridItemMeta>
  >;
  const HeaderComponent = controller.HeaderComponent || GridHeaderComponent;

  const ItemComponent: React.FC<ListItemProps<any, GridItemMeta>> = (listItemProps) => {
    return <RowComponent {...listItemProps} columns={controller.columns} />;
  };

  const ListHeaderComponent: React.FC<ListHeaderProps> = (listHeaderProps) => {
    return <HeaderComponent {...listHeaderProps} columns={controller.columns} />;
  };

  const { view } = useListView<any, GridItemMeta>({
    className: 'o-grid-content',
    bodyClassName: addClassname('o-grid-body', bodyClassName),
    BodyComponent: BodyComponent,
    headerClassName: addClassname('o-grid-header', headerClassName),
    HeaderComponent: ListHeaderComponent,
    ItemComponent,
    collection: controller,
    height: controller.height,
    ref: contentRef,
  });

  useEffect(() => {
    controller.onMount(gridRef, contentRef);
  });

  return (
    <GridContext.Provider value={controller.asService()}>
      <GridColumnsContext.Provider value={controller.columns}>
        <GridValueContext.Provider value={controller.items}>
          <div className={classNames} ref={gridRef}>
            {view}
          </div>
        </GridValueContext.Provider>
      </GridColumnsContext.Provider>
    </GridContext.Provider>
  );
};

GridComponent.displayName = 'Grid';

export default GridComponent;

import React, { useRef } from 'react';
import { addClassname } from '../../../utils/style';
import ListBodyComponent from '../../list/components/ListBodyComponent';
import useListView from '../../list/hooks/useListView';
import { ListBodyProps, ListHeaderProps, ListItemProps } from '../../list/typings';
import GridService from '../GridService';
import { GridBodyRowProps, GridItemMeta, GridProps } from '../typings';
import { GridColumnsContext } from '../useGridColumns';
import { GridContext } from '../useGridContext';
import { GridValueContext } from '../useGridValue';
import GridBodyRowComponent from './GridBodyRowComponent';
import GridHeaderComponent from './GridHeaderComponent';

const GridComponent = React.forwardRef<HTMLDivElement, GridProps>(({ service, contentRef, className }, ref) => {
  const classNames = addClassname(addClassname('o-grid', service.className), className);

  const contextRef = useRef<GridService>(service);
  const bodyClassName =
    typeof service.bodyClassName === 'function' ? service.bodyClassName(service) : service.bodyClassName;
  const headerClassName =
    typeof service.headerClassName === 'function' ? service.headerClassName(service) : service.headerClassName;
  // const footerClassName =
  //   typeof service.headerClassName === 'function' ? service.headerClassName(service) : service.headerClassName;

  const BodyComponent = (service.BodyComponent || ListBodyComponent) as React.FC<ListBodyProps<any, GridItemMeta>>;
  const RowComponent = (service.RowComponent || GridBodyRowComponent) as React.FC<GridBodyRowProps<any, GridItemMeta>>;
  const HeaderComponent = service.HeaderComponent || GridHeaderComponent;

  const ItemComponent: React.FC<ListItemProps<any, GridItemMeta>> = (listItemProps) => {
    return <RowComponent {...listItemProps} columns={service.columns} />;
  };

  const ListHeaderComponent: React.FC<ListHeaderProps> = (listHeaderProps) => {
    return <HeaderComponent {...listHeaderProps} columns={service.columns} />;
  };

  const { view } = useListView<any, GridItemMeta>({
    className: 'o-grid-content',
    bodyClassName: addClassname('o-grid-body', bodyClassName),
    BodyComponent: BodyComponent,
    headerClassName: addClassname('o-grid-header', headerClassName),
    HeaderComponent: ListHeaderComponent,
    ItemComponent,
    collection: service,
    height: service.height,
    ref: contentRef,
  });

  return (
    <GridContext.Provider value={contextRef.current}>
      <GridColumnsContext.Provider value={service.columns}>
        <GridValueContext.Provider value={service.items}>
          <div className={classNames} ref={ref}>
            {view}
          </div>
        </GridValueContext.Provider>
      </GridColumnsContext.Provider>
    </GridContext.Provider>
  );
});

GridComponent.displayName = 'Grid';

export default GridComponent;

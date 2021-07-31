import React, { useRef } from 'react';
import { addClassname } from '../../../utils/style';
import ListBodyComponent from '../../list/components/ListBodyComponent';
import useListView from '../../list/hooks/useListView';
import { ListHeaderProps, ListItemProps } from '../../list/typings';
import GridService from '../GridService';
import { GridProps } from '../typings';
import { GridColumnsContext } from '../useGridColumns';
import { GridContext } from '../useGridContext';
import { GridValueContext } from '../useGridValue';
import GridBodyRowComponent from './GridBodyRowComponent';
import GridHeaderComponent from './GridHeaderComponent';

const GridComponent = React.forwardRef<HTMLDivElement, GridProps>(({ service, contentRef }, ref) => {
  const classNames = addClassname('o-grid', service.className);

  const contextRef = useRef<GridService>(service);
  const bodyClassName =
    typeof service.bodyClassName === 'function' ? service.bodyClassName(service) : service.bodyClassName;
  const headerClassName =
    typeof service.headerClassName === 'function' ? service.headerClassName(service) : service.headerClassName;
  // const footerClassName =
  //   typeof service.headerClassName === 'function' ? service.headerClassName(service) : service.headerClassName;

  const BodyComponent = service.BodyComponent || ListBodyComponent;
  const RowComponent = service.RowComponent || GridBodyRowComponent;
  const HeaderComponent = service.HeaderComponent || GridHeaderComponent;

  const ItemComponent: React.FC<ListItemProps> = (listItemProps) => {
    return <RowComponent {...listItemProps} columns={service.columns} />;
  };

  const ListHeaderComponent: React.FC<ListHeaderProps> = (listHeaderProps) => {
    return <HeaderComponent {...listHeaderProps} columns={service.columns} />;
  };

  const { view } = useListView({
    className: 'o-grid-content',
    bodyClassName,
    BodyComponent: BodyComponent,
    headerClassName,
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

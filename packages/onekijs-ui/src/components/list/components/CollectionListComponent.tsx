import React, { FC, useRef } from 'react';
import { addClassname } from '../../../utils/style';
import { ListCollectionContext } from '../hooks/useListCollection';
import { ListItemsContext } from '../hooks/useListItems';
import useListView from '../hooks/useListView';
import { ListComponentProps } from '../typings';
import ListBodyComponent from './ListBodyComponent';
import ListItemComponent from './ListItemComponent';

const CollectionListComponent: FC<ListComponentProps> = ({
  className,
  dataSource,
  height,
  ItemComponent = ListItemComponent,
  itemHeight,
  preload,
  increment,
  onItemClick,
  onItemMouseOver,
  onItemMouseOut,
  onItemMouseEnter,
  onItemMouseLeave,
  virtual,
  style,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { items, isVirtual, totalSize, virtualItems } = useListView({
    dataSource,
    height,
    itemHeight,
    preload,
    increment,
    ref,
    virtual,
  });

  return (
    <ListCollectionContext.Provider value={dataSource.asService()}>
      <ListItemsContext.Provider value={dataSource.items}>
        <ListBodyComponent
          className={addClassname('o-list', className)}
          height={height}
          ItemComponent={ItemComponent}
          items={items}
          bodyRef={ref}
          onItemClick={onItemClick}
          onItemMouseEnter={onItemMouseEnter}
          onItemMouseLeave={onItemMouseLeave}
          onItemMouseOut={onItemMouseOut}
          onItemMouseOver={onItemMouseOver}
          style={style}
          totalSize={totalSize}
          virtualItems={isVirtual ? virtualItems : undefined}
        />
      </ListItemsContext.Provider>
    </ListCollectionContext.Provider>
  );
};

export default CollectionListComponent;

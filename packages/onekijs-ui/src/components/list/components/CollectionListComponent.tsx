import React, { useRef } from 'react';
import { addClassname } from '../../../utils/style';
import { ListServiceContext } from '../hooks/useListService';
import { ListStateContext } from '../hooks/useListState';
import useListView from '../hooks/useListView';
import { CollectionListProps, ListItem } from '../typings';
import ListBodyComponent from './ListBodyComponent';
import ListItemComponent, { ListItemContent } from './ListItemComponent';
import LoadingItem from './LoadingItem';

const CollectionListComponent = <T extends any = any, I extends ListItem<T> = ListItem<T>>({
  autoRefresh,
  className,
  controller,
  follow,
  height,
  ItemComponent = ListItemComponent,
  ItemLoadingComponent = LoadingItem,
  ItemContentComponent = ListItemContent,
  NotFoundComponent,
  itemHeight,
  preload,
  keyboardNavigable,
  increment,
  multiSelect,
  onItemActivate,
  onItemHighlight,
  onItemSelect,
  onItemDeactivate,
  onItemUnhighlight,
  onItemUnselect,
  paddingEnd,
  paddingStart,
  virtual,
  style,
  tail,
}: CollectionListProps<T, I>) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { items, isVirtual, totalSize, virtualItems, scrollToIndex, scrollToOffset } = useListView({
    controller,
    height,
    itemHeight,
    paddingEnd,
    paddingStart,
    preload,
    increment,
    ref,
    virtual,
  });

  return (
    <ListServiceContext.Provider value={controller.asService()}>
      <ListStateContext.Provider value={controller.state}>
        <ListBodyComponent
          autoRefresh={autoRefresh}
          className={addClassname('o-list', className)}
          follow={follow}
          height={height}
          ItemLoadingComponent={ItemLoadingComponent}
          ItemComponent={ItemComponent}
          ItemContentComponent={ItemContentComponent}
          NotFoundComponent={NotFoundComponent}
          items={items}
          keyboardNavigable={keyboardNavigable}
          bodyRef={ref}
          onItemActivate={onItemActivate}
          onItemDeactivate={onItemDeactivate}
          onItemHighlight={onItemHighlight}
          onItemUnhighlight={onItemUnhighlight}
          onItemSelect={onItemSelect}
          onItemUnselect={onItemUnselect}
          multiSelect={multiSelect}
          scrollToIndex={scrollToIndex}
          scrollToOffset={scrollToOffset}
          service={controller.asService()}
          state={controller.state}
          style={style}
          totalSize={totalSize}
          tail={tail}
          virtualItems={isVirtual ? virtualItems : undefined}
        />
      </ListStateContext.Provider>
    </ListServiceContext.Provider>
  );
};

export default CollectionListComponent;

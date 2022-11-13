import React, { useRef } from 'react';
import { addClassname } from '../../../utils/style';
import { ListServiceContext } from '../hooks/useListService';
import { ListStateContext } from '../hooks/useListState';
import useListView from '../hooks/useListView';
import { CollectionListProps, ListItem } from '../typings';
import ListBodyComponent from './ListBodyComponent';
import ListItemComponent, { ListItemContent } from './ListItemComponent';
import LoadingItem from './LoadingItem';

const CollectionListComponent = <T = any, I extends ListItem<T> = ListItem<T>>({
  className,
  controller,
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
}: CollectionListProps<T, I>) => {
  const ref = useRef<HTMLDivElement>(null);

  const { items, isVirtual, totalSize, virtualItems, scrollToIndex } = useListView({
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
          className={addClassname('o-list', className)}
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
          service={controller.asService()}
          state={controller.state}
          style={style}
          totalSize={totalSize}
          virtualItems={isVirtual ? virtualItems : undefined}
        />
      </ListStateContext.Provider>
    </ListServiceContext.Provider>
  );
};

export default CollectionListComponent;

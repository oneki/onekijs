import React, { FC, useRef } from 'react';
import { addClassname } from '../../../utils/style';
import { ListServiceContext } from '../hooks/useListService';
import { ListStateContext } from '../hooks/useListState';
import useListView from '../hooks/useListView';
import { CollectionListProps } from '../typings';
import ListBodyComponent from './ListBodyComponent';
import ListItemComponent from './ListItemComponent';

const CollectionListComponent: FC<CollectionListProps> = ({
  className,
  controller,
  height,
  ItemComponent = ListItemComponent,
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
  virtual,
  style,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { items, isVirtual, totalSize, virtualItems, scrollToIndex } = useListView({
    controller,
    height,
    itemHeight,
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
          ItemComponent={ItemComponent}
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
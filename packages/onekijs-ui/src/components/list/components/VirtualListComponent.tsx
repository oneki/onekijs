import { useIsomorphicLayoutEffect } from 'onekijs';
import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { useVirtual } from 'react-virtual';
import { CollectionStatus, Item, ItemMeta, LoadingStatus } from '../../../lib/typings';
import { toCollectionItem } from '../../../utils/collection';
import { addClassname } from '../../../utils/style';
import { VirtualListProps } from '../typings';
import { canFetchMore, getListStatus, emptyListItem } from '../utils';
import ListItemComponent from './ListItemComponent';

const defaultHeight = 200;
const defaultItemHeight = 21;
const defaultPreload = 100;
const defaultIncrement = 100;

const VirtualistComponent: FC<VirtualListProps> = ({
  className,
  collection,
  height = defaultHeight,
  ItemComponent = ListItemComponent,
  itemHeight = defaultItemHeight,
  preload = defaultPreload,
  increment = defaultIncrement,
  onItemClick,
  onItemMouseOver,
}) => {
  const parentRef = useRef(null);

  const estimatedItemHeight = useCallback(
    (index: number) => {
      if (typeof itemHeight === 'function') {
        return itemHeight(index) || defaultItemHeight;
      }
      return defaultItemHeight;
    },
    [itemHeight],
  );

  const memo = useMemo(() => {
    const result: {
      items: (Item<any, ItemMeta> | undefined)[];
      status: CollectionStatus;
    } = {
      items: [],
      status: getListStatus(collection),
    };

    if (result.status === LoadingStatus.NotInitialized) {
      result.items = Array(preload).fill(toCollectionItem(undefined, collection.getAdapter()));
    } else {
      result.items = collection.items || [];
    }
    return result;
  }, [collection, preload]);

  const { totalSize, virtualItems, scrollToIndex } = useVirtual({
    size: memo.items.length,
    estimateSize: estimatedItemHeight,
    parentRef,
  });

  useIsomorphicLayoutEffect(() => {
    const offset = collection.getOffset() || 0;
    const firstVirualItem = virtualItems[0];
    const firstVirualItemIndex = firstVirualItem ? firstVirualItem.index : 0;
    if (
      collection.status !== LoadingStatus.Loading &&
      collection.status !== LoadingStatus.Deprecated &&
      offset === 0 &&
      firstVirualItemIndex !== 0
    ) {
      scrollToIndex(0);
    }
  }, [collection]);

  useEffect(() => {
    if (collection.status === LoadingStatus.NotInitialized) {
      collection.load(preload);
    } else if (canFetchMore(collection)) {
      const lastVirtualItem = virtualItems[virtualItems.length - 1];
      const lastVirtualItemIndex = lastVirtualItem ? lastVirtualItem.index : 0;
      if (lastVirtualItemIndex >= memo.items.length - preload / 2) {
        collection.load(increment, (collection.items as any[]).length);
      }
    }
  }, [collection, preload, virtualItems, increment, memo]);

  return (
    <div
      ref={parentRef}
      className={addClassname('o-list', className)}
      style={{
        maxHeight: `${typeof height === 'string' ? height : `${height}px`}`,
        overflow: 'auto',
      }}
    >
      <div
        className="o-list-virtualizer"
        style={{
          height: `${totalSize}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualItems.map(({ index, measureRef, start }) => {
          const listItem = memo.items[index];
          return (
            <div
              className="o-list-virtual-item"
              key={`virtual-item-${index}`}
              ref={measureRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                minHeight: '20px',
                transform: `translateY(${start}px)`,
              }}
            >
              <ItemComponent
                key={`item-${index}`}
                index={index}
                item={listItem || emptyListItem}
                onClick={onItemClick}
                onMouseOver={onItemMouseOver}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VirtualistComponent;

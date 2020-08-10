import { useIsomorphicLayoutEffect } from 'onekijs';
import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { useVirtual } from 'react-virtual';
import { CollectionStatus, LoadingStatus } from '../../../lib/typings';
import { isCollection } from '../../../utils/collection';
import { addClassname } from '../../../utils/style';
import { ListItem, VirtualListProps } from '../typings';
import { adapt, canFetchMore, getListStatus } from '../utils';
import ListItemComponent from './ListItemComponent';

const defaultHeight = 200;
const defaultItemHeight = 21;
const defaultPreload = 100;
const defaultIncrement = 10;

const VirtualistComponent: FC<VirtualListProps> = ({
  adapter,
  className,
  data,
  height = defaultHeight,
  ItemComponent = ListItemComponent,
  itemHeight = defaultItemHeight,
  preload = defaultPreload,
  increment = defaultIncrement,
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
      items: ListItem[];
      status: CollectionStatus;
    } = {
      items: [],
      status: getListStatus(data),
    };

    if (isCollection(data)) {
      const items = data.data || Array(preload);
      const metas = data.meta || [];
      const maxIndex = Math.max(items.length, metas.length);
      result.items = Array(maxIndex)
        .fill(undefined)
        .map((_v, index) => adapt(items[index], metas[index], adapter));
      console.log('status', result.status);
      if (result.status === LoadingStatus.Loading || result.status === LoadingStatus.Deprecated) {
        result.items = result.items.slice(0, items.length);
      }
    } else {
      result.items = data.map((item) => adapt(item, undefined, adapter));
    }

    // if (result.status === LoadingStatus.PartialLoading || result.status === LoadingStatus.PartialDeprecated) {
    //   const firstNotLoadedItem = result.items.findIndex(
    //     (item) => item.item === undefined && (item.deprecated || item.loading),
    //   );
    //   if (firstNotLoadedItem >= 0) {
    //     result.items = result.items.slice(0, firstNotLoadedItem + 1);
    //   }
    // }
    return result;
  }, [data, preload, adapter]);

  const { totalSize, virtualItems, scrollToIndex } = useVirtual({
    size: memo.items.length,
    estimateSize: estimatedItemHeight,
    parentRef,
  });

  useIsomorphicLayoutEffect(() => {
    if (isCollection(data)) {
      const offset = data.getOffset() || 0;
      const firstVirualItem = virtualItems[0];
      const firstVirualItemIndex = firstVirualItem ? firstVirualItem.index : 0;
      if (
        data.status !== LoadingStatus.Loading &&
        data.status !== LoadingStatus.Deprecated &&
        offset === 0 &&
        firstVirualItemIndex !== 0
      ) {
        scrollToIndex(0);
      }
    }
  }, [data]);

  useEffect(() => {
    if (isCollection(data)) {
      if (data.status === LoadingStatus.NotInitialized) {
        data.load(preload);
      } else if (canFetchMore(data)) {
        const lastVirtualItem = virtualItems[virtualItems.length - 1];
        const lastVirtualItemIndex = lastVirtualItem ? lastVirtualItem.index : 0;
        if (lastVirtualItemIndex >= memo.items.length - preload / 2) {
          data.load(increment, (data.data as any[]).length);
        }
      }
    }
  }, [data, preload, virtualItems, increment, memo]);

  return (
    <div
      ref={parentRef}
      className={addClassname('o-list', className)}
      style={{
        maxHeight: `${height}px`,
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
              <ItemComponent key={`item-${index}`} index={index} {...listItem} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VirtualistComponent;

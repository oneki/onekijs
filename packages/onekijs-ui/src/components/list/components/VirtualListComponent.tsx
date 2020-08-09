import { useIsomorphicLayoutEffect } from 'onekijs';
import React, { FC, useCallback, useEffect, useRef, useMemo } from 'react';
import { useVirtual } from 'react-virtual';
import { isCollection } from '../../../utils/collection';
import { addClassname } from '../../../utils/style';
import { ListItem, ListStatus, VirtualListProps } from '../typings';
import { adapt, canFetchMore, getListStatus } from '../utils';
import ListItemComponent from './ListItemComponent';
import { loadingSymbol } from '../../../lib/typings';

const defaultHeight = 200;
const defaultItemHeight = 21;
const defaultPreload = 100;
const defaultIncrement = 10;

const perPageCount = (height: number, itemHeight: (index: number) => number) => {
  return Math.ceil(height / itemHeight(0));
};

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
  const itemCountRef = useRef<number | undefined>();

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
      items: any[];
      scrollToTop: boolean;
      status: ListStatus;
    } = {
      items: [],
      scrollToTop: false,
      status: getListStatus(data),
    };

    switch (result.status) {
      case ListStatus.NotInitialized:
      case ListStatus.Loading:
        const count = itemCountRef.current || perPageCount(height, estimatedItemHeight);
        result.items = Array(count).fill(loadingSymbol);
        result.scrollToTop = true;
        break;
      default:
        result.items = isCollection(data) ? data.data || [] : data;
        break;
    }
    if (result.status === ListStatus.PartialLoading) {
      const firstLoadingItem = result.items.indexOf(loadingSymbol);
      if (firstLoadingItem > 0) {
        result.items = result.items.slice(0, firstLoadingItem + 1);
      }
    }
    itemCountRef.current = result.items.length;
    return result;
  }, [data, estimatedItemHeight, height]);

  const { totalSize, virtualItems, scrollToIndex } = useVirtual({
    size: memo.items.length,
    estimateSize: estimatedItemHeight,
    parentRef,
  });

  const filter = isCollection(data) ? data.getFilter() : undefined;

  useIsomorphicLayoutEffect(() => {
    scrollToIndex(0);
  }, [filter]);

  useEffect(() => {
    if (isCollection(data)) {
      const status = getListStatus(data);
      if (status === ListStatus.NotInitialized) {
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
          const item = memo.items[index];
          const listItem: ListItem = adapt(item, adapter);
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

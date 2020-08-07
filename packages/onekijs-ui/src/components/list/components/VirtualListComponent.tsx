import React, { FC, useCallback, useEffect, useRef } from 'react';
import { useVirtual } from 'react-virtual';
import { isCollection } from '../../../utils/collection';
import { loading } from '../../../utils/query';
import { addClassname } from '../../../utils/style';
import { ListItem, ListStatus, VirtualListProps } from '../typings';
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

  let items = isCollection(data) ? data.data : data;
  if (items === undefined) {
    items = Array(preload).fill(loading);
  } else {
    const firstLoadingItem = items.indexOf(loading);
    if (firstLoadingItem > 0) {
      items = items.slice(0, firstLoadingItem + 1);
    }
  }
  const { totalSize, virtualItems } = useVirtual({
    size: items.length,
    estimateSize: estimatedItemHeight,
    parentRef,
  });

  useEffect(() => {
    if (isCollection(data)) {
      const status = getListStatus(data);
      if (status === ListStatus.NotInitialized) {
        data.load(preload);
      } else if (canFetchMore(data)) {
        const lastVirtualItem = virtualItems[virtualItems.length - 1];
        const lastVirtualItemIndex = lastVirtualItem ? lastVirtualItem.index : 0;
        if (lastVirtualItemIndex >= (items as any[]).length - preload / 2) {
          data.load(increment, (data.data as any[]).length);
        }
      }
    }
  }, [data, preload, virtualItems, increment, items]);

  return (
    <div
      ref={parentRef}
      className={addClassname('o-list', className)}
      style={{
        height: `${height}px`,
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
          const item = (items as any[])[index];
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

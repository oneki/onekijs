import { CollectionStatus, Item, ItemMeta, LoadingStatus, toCollectionItem } from 'onekijs-core';
import React, { ReactElement, useCallback, useEffect, useMemo, useRef } from 'react';
import { useVirtual } from 'react-virtual';
import { addClassname } from '../../../utils/style';
import ListItemComponent from '../components/ListItemComponent';
import { ListInternalProps } from '../typings';
import { canFetchMore, emptyListItem, getListStatus } from '../utils';

const defaultHeight = '100%';
const defaultItemHeight = 37;
const defaultPreload = 100;
const defaultIncrement = 100;

const useListView: (props: ListInternalProps) => { view: ReactElement, scrollToIndex?: (index: number, options?: { align: 'start' | 'center' | 'end' | 'auto' }) => void } = ({
  className,
  collection,
  height = defaultHeight,
  ItemComponent = ListItemComponent,
  itemHeight = defaultItemHeight,
  preload = defaultPreload,
  increment = defaultIncrement,
  onItemClick,
  onItemMouseOver,
  onItemMouseOut,
  onItemMouseEnter,
  onItemMouseLeave,
  parentRef,
  tag: Component='div',
}) => {
  const virtual = height !== undefined
  const localParentRef = useRef(null);
  let overflow = 'none';
  if (parentRef === undefined) {
    parentRef = localParentRef;
    overflow = 'auto';
  }

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

  let { totalSize, virtualItems, scrollToIndex } = useVirtual({
    size: memo.items.length,
    estimateSize: estimatedItemHeight,
    parentRef,
  });

  useEffect(() => {
    if (virtual) {
      if (collection.status === LoadingStatus.NotInitialized) {
        collection.load(preload);
      } else if (canFetchMore(collection)) {
        const lastVirtualItem = virtualItems[virtualItems.length - 1];
        const lastVirtualItemIndex = lastVirtualItem ? lastVirtualItem.index : 0;
        if (lastVirtualItemIndex >= memo.items.length - preload / 2) {
          collection.load(increment, (collection.items as any[]).length);
        }
      }      
    }
    else if (collection.status === LoadingStatus.NotInitialized) {
      collection.load();
    }

  }, [collection, preload, virtualItems, increment, memo]);

  let view: ReactElement;

  if (virtual) {
    view = (
      <div
        ref={parentRef}
        className={addClassname('o-list', className)}
        style={{
          maxHeight: `${typeof height === 'string' ? height : `${height}px`}`,
          overflow: overflow,
        }}
      >
        <Component
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
                  onMouseOut={onItemMouseOut}
                  onMouseEnter={onItemMouseEnter}
                  onMouseLeave={onItemMouseLeave}
                />
              </div>
            );
          })}
        </Component>
      </div>
    )   
    return { view, scrollToIndex, } 

  } else {
    view = (
      <div className={addClassname('o-list', className)}>
        {memo.items.map((item: any, index: number) => {
          return (
            <ItemComponent
              key={`item-${index}`}
              index={index}
              item={item || emptyListItem}
              onClick={onItemClick}
              onMouseOver={onItemMouseOver}
              onMouseOut={onItemMouseOut}
              onMouseEnter={onItemMouseEnter}
              onMouseLeave={onItemMouseLeave}              
            />
          );
        })}
      </div>
    )
    return {
      view
    }    
  }

};

export default useListView;
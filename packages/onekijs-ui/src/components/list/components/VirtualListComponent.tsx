import { LoadingStatus, useThrottle } from 'onekijs-framework';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { ListItem, VirtualItemWrapperProps, VirtualListProps } from '../typings';
import ListItemComponent, { ListItemContent } from './ListItemComponent';
import LoadingItem from './LoadingItem';

const VirtualItemWrapper = <T = any, I extends ListItem<T> = ListItem<T>>({
  virtualItem,
  listItem,
  ItemComponent = ListItemComponent,
  ItemContentComponent = ListItemContent,
  ItemLoadingComponent = LoadingItem,
  onItemClick,
  onItemMouseEnter,
  onItemMouseLeave,
}: VirtualItemWrapperProps<T, I>) => {
  const { index, measureRef, start } = virtualItem;
  const ref = useRef<HTMLDivElement>(null!);
  const previousHeightRef = useRef<number | undefined>();

  const measure = useCallback(
    (el: HTMLElement | null) => {
      if (el?.offsetHeight !== previousHeightRef.current && el?.offsetHeight) {
        previousHeightRef.current = el.offsetHeight;
        measureRef(el);
      }
    },
    [measureRef],
  );

  const measureThrottle = useThrottle(measure, 50);

  const resizeObserver = useMemo(() => {
    return new ResizeObserver(() => {
      measureThrottle(ref.current);
    });
  }, [measureThrottle]);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      previousHeightRef.current = el.offsetHeight;
      resizeObserver.observe(el);
    }
    return () => {
      if (el) {
        resizeObserver.unobserve(el);
      }
    };
  }, [resizeObserver]);

  return (
    <div
      className="o-virtual-item"
      id={`virtual-item-${listItem?.uid || index}`}
      ref={measureRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        minHeight: '20px',
        transform: `translateY(${start}px)`,
      }}
    >
      <div ref={ref}>
        {listItem?.loadingStatus === LoadingStatus.Loading && <ItemLoadingComponent />}
        {listItem?.loadingStatus !== LoadingStatus.Loading && listItem && listItem.data && (
          <ItemComponent
            key={`item-${listItem?.uid || index}`}
            index={index}
            item={listItem}
            data={listItem.data}
            onClick={onItemClick}
            onMouseEnter={onItemMouseEnter}
            onMouseLeave={onItemMouseLeave}
            ItemContentComponent={ItemContentComponent}
          />
        )}
      </div>
    </div>
  );
};

const VirtualListComponent = <T = any, I extends ListItem<T> = ListItem<T>>({
  items,
  ItemComponent = ListItemComponent,
  ItemLoadingComponent = LoadingItem,
  ItemContentComponent = ListItemContent,
  onItemClick,
  onItemMouseEnter,
  onItemMouseLeave,
  virtualItems,
}: VirtualListProps<T, I>) => {
  return (
    <>
      {virtualItems.map((virtualItem) => {
        const listItem = items[virtualItem.index];
        return (
          <VirtualItemWrapper
            key={`virtual-item-${listItem?.uid || virtualItem.index}`}
            listItem={listItem}
            virtualItem={virtualItem}
            ItemComponent={ItemComponent}
            ItemLoadingComponent={ItemLoadingComponent}
            ItemContentComponent={ItemContentComponent}
            onItemClick={onItemClick}
            onItemMouseEnter={onItemMouseEnter}
            onItemMouseLeave={onItemMouseLeave}
          />
        );
      })}
    </>
  );
};

export default VirtualListComponent;

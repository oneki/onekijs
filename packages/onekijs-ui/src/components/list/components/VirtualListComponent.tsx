import { useThrottle } from 'onekijs-framework';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { VirtualItemWrapperProps, VirtualListProps } from '../typings';
import ListItemComponent from './ListItemComponent';

const VirtualItemWrapper: React.FC<VirtualItemWrapperProps<any, any>> = ({
  virtualItem,
  listItem,
  ItemComponent = ListItemComponent,
  onItemClick,
  onItemMouseEnter,
  onItemMouseLeave,
}) => {
  const { index, measureRef, start } = virtualItem;
  const ref = useRef<HTMLDivElement>(null!);
  const previousHeightRef = useRef<number | undefined>();

  const measure = useCallback(
    (el: HTMLElement | null) => {
      if (el?.offsetHeight !== previousHeightRef.current && el?.offsetHeight) {
        console.log('previous', previousHeightRef.current, 'new', el?.offsetHeight);
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
        width: '100%',
        minHeight: '20px',
        transform: `translateY(${start}px)`,
      }}
    >
      <div ref={ref}>
        <ItemComponent
          key={`item-${listItem?.uid || index}`}
          index={index}
          item={listItem}
          onClick={onItemClick}
          onMouseEnter={onItemMouseEnter}
          onMouseLeave={onItemMouseLeave}
        />
      </div>
    </div>
  );
};

const VirtualListComponent: React.FC<VirtualListProps<any, any>> = ({
  items,
  ItemComponent = ListItemComponent,
  onItemClick,
  onItemMouseEnter,
  onItemMouseLeave,
  virtualItems,
}) => {
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

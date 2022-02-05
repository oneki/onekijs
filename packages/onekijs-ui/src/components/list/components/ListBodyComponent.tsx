import { get, Item, last, useEventListener } from 'onekijs-framework';
import React, { useCallback, useEffect, useRef } from 'react';
import { addStyle } from '../../../utils/style';
import { ListBodyProps } from '../typings';
import ListItemComponent from './ListItemComponent';
import DefaultVirtualListComponent from './VirtualListComponent';

const findItemIndex = (items?: (Item<unknown> | undefined)[], uid?: string): number => {
  if (items === undefined) {
    return -1;
  }
  return items.findIndex((i) => {
    if (i === undefined) {
      return false;
    }
    if (i.uid === undefined) {
      return false;
    }
    return i.uid === uid;
  });
};

const ListBodyComponent: React.FC<ListBodyProps<any, any>> = ({
  bodyRef,
  className,
  height,
  items,
  ItemComponent = ListItemComponent,
  keyboardNavigable,
  multiSelect,
  onItemAnimate,
  onItemActivate,
  onItemDeactivate,
  onItemSelect,
  onItemUnselect,
  onItemHighlight,
  onItemUnhighlight,
  parentRef,
  scrollToIndex,
  service,
  state,
  style,
  totalSize,
  virtualItems,
  VirtualListComponent = DefaultVirtualListComponent,
}) => {
  const scrollAlignRef = useRef<'center' | 'auto'>('center');
  const lastActiveItemUid = useRef<string>();

  const onItemClick = useCallback(
    (item: any, index: number) => {
      if (item !== undefined && !item.disabled) {
        if (onItemSelect && !item.selected) {
          onItemSelect(item, index);
        } else if (onItemUnselect && item.selected) {
          onItemUnselect(item, index);
        } else if (multiSelect && !item.selected) {
          service.addSelected('item', item);
        } else if (multiSelect && item.selected) {
          service.removeSelected('item', item);
        } else if (!item.selected) {
          service.setSelected('item', item);
        } else {
          service.setSelected('item', []);
        }
      }
    },
    [multiSelect, onItemSelect, onItemUnselect, service],
  );

  const onItemMouseEnter = useCallback(
    (item: any, index: number) => {
      if (item !== undefined && !item.disabled) {
        if (onItemHighlight) {
          onItemHighlight(item, index);
        } else {
          service.setHighlighted('item', item);
        }
      }
    },
    [onItemHighlight, service],
  );

  const onItemMouseLeave = useCallback(
    (item: any, index: number) => {
      if (item !== undefined && !item.disabled) {
        if (onItemUnhighlight) {
          onItemUnhighlight(item, index);
        } else {
          service.removeHighlighted('item', item);
        }
      }
    },
    [onItemUnhighlight, service],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!keyboardNavigable) return;
      let nextIndex: number | undefined;
      let nextItem: Item<any> | undefined;
      if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(e.key)) {
        const activeUid = last(state.active);
        const activeItem = activeUid !== undefined ? service.getItem(activeUid) : undefined;
        const activeIndex = findItemIndex(state.items, activeUid);
        switch (e.key) {
          case 'ArrowDown':
          case 'ArrowUp':
            if (e.key === 'ArrowDown') {
              nextIndex = activeIndex === -1 ? 0 : activeIndex + 1;
            } else {
              nextIndex = activeIndex <= 0 ? 0 : activeIndex - 1;
            }
            do {
              nextItem = get(state.items, nextIndex.toString());
              if (e.key === 'ArrowDown') {
                nextIndex++;
              } else {
                nextIndex--;
              }
            } while (nextItem !== undefined && nextItem.disabled);

            if (nextItem !== undefined) {
              scrollAlignRef.current = 'auto';
              if (onItemActivate) {
                onItemActivate(nextItem, nextIndex);
              } else {
                service.setActive('item', nextItem);
              }
            }
            break;
          case 'Enter':
            if (activeIndex !== -1) {
              nextItem = get(state.items, activeIndex.toString());
              onItemClick(nextItem, activeIndex);
            }
            break;

          case 'Escape':
            if (onItemDeactivate) {
              onItemDeactivate(activeItem, activeIndex);
            } else {
              service.setActive('item', []);
            }
            break;
        }
      }
    },
    [keyboardNavigable, onItemActivate, onItemDeactivate, onItemClick, service, state.active, state.items],
  );

  useEffect(() => {
    if (scrollToIndex) {
      const activeUid = state.active === undefined ? undefined : state.active[0];
      if (activeUid !== lastActiveItemUid.current) {
        lastActiveItemUid.current = activeUid;
        const activeIndex = findItemIndex(state.items, activeUid);

        if (activeIndex >= 0) {
          scrollToIndex(activeIndex, { align: scrollAlignRef.current });
        }
      }
    }
  });

  useEventListener('keydown', onKeyDown, false);

  const overflow = parentRef && parentRef !== bodyRef ? 'visible' : 'auto';
  if (virtualItems !== undefined) {
    return (
      <div
        ref={bodyRef}
        className={className}
        style={addStyle(
          {
            maxHeight: `${typeof height === 'string' ? height : `${height}px`}`,
            overflow: overflow,
          },
          style,
        )}
      >
        <div
          className="o-virtualizer"
          style={{
            height: `${totalSize}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          <VirtualListComponent
            items={items}
            ItemComponent={ItemComponent}
            virtualItems={virtualItems}
            onItemAnimate={onItemAnimate}
            onItemMouseEnter={onItemMouseEnter}
            onItemMouseLeave={onItemMouseLeave}
            onItemClick={onItemClick}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div
        ref={bodyRef}
        className={className}
        style={addStyle(
          {
            maxHeight: `${typeof height === 'string' ? height : `${height}px`}`,
            overflow: 'auto',
          },
          style,
        )}
      >
        {items.map((item: any, index: number) => {
          return (
            <ItemComponent
              key={`item-${index}`}
              index={index}
              item={item}
              onClick={onItemClick}
              onMouseEnter={onItemMouseEnter}
              onMouseLeave={onItemMouseLeave}
            />
          );
        })}
      </div>
    );
  }
};

export default ListBodyComponent;

import { get, Item, last, useEventListener } from 'onekijs-framework';
import React, { useCallback } from 'react';
import { addStyle } from '../../../utils/style';
import useListService from '../hooks/useListService';
import useListState from '../hooks/useListState';
import { ListBodyProps } from '../typings';

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
  ItemComponent,
  keyboardNavigable,
  multiSelect,
  onItemActivate,
  onItemDeactivate,
  onItemSelect,
  onItemUnselect,
  onItemHighlight,
  onItemUnhighlight,
  parentRef,
  style,
  totalSize,
  virtualItems,
}) => {
  const service = useListService();
  const state = useListState();

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
          service.setHighlighted('item', []);
        }
      }
    },
    [onItemUnhighlight, service],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!keyboardNavigable) return;
      const activeUid = last(state.active);
      const activeItem = activeUid !== undefined ? service.getItem(activeUid) : undefined;
      const currentIndex = findItemIndex(state.items, activeUid);
      let nextIndex: number | undefined;
      let nextItem: Item<any> | undefined;
      switch (e.key) {
        case 'ArrowDown':
          nextIndex = currentIndex === -1 ? 0 : currentIndex + 1;
          do {
            nextItem = get(state.items, nextIndex.toString());
            nextIndex++;
          } while (nextItem !== undefined && nextItem.disabled);

          if (nextItem !== undefined) {
            if (onItemActivate) {
              onItemActivate(nextItem, nextIndex);
            } else {
              service.setActive('item', nextItem);
            }
          }
          break;

        case 'ArrowUp':
          nextIndex = currentIndex <= 0 ? 0 : currentIndex - 1;
          do {
            nextItem = get(state.items, nextIndex.toString());
            nextIndex--;
          } while (nextItem !== undefined && nextItem.disabled);

          if (nextItem !== undefined) {
            if (onItemActivate) {
              onItemActivate(nextItem, nextIndex);
            } else {
              service.setActive('item', nextItem);
            }
          }
          break;

        case 'Enter':
          if (currentIndex !== -1) {
            nextItem = get(state.items, currentIndex.toString());
            onItemClick(nextItem, currentIndex);
          }
          break;

        case 'Escape':
          if (onItemDeactivate) {
            onItemDeactivate(activeItem, currentIndex);
          } else {
            service.setActive('item', []);
          }
          break;
      }
    },
    [keyboardNavigable, onItemActivate, onItemDeactivate, onItemClick, service, state.active, state.items],
  );

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
          {virtualItems.map(({ index, measureRef, start }) => {
            const listItem = items[index];
            return (
              <div
                className="o-virtual-item"
                key={`virtual-item-${listItem?.uid || index}`}
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
                  key={`item-${listItem?.uid || index}`}
                  index={index}
                  item={listItem}
                  onClick={onItemClick}
                  onMouseEnter={onItemMouseEnter}
                  onMouseLeave={onItemMouseLeave}
                />
              </div>
            );
          })}
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

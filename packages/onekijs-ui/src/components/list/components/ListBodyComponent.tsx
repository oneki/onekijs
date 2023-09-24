import { get, isCollectionInitializing, Item, last, LoadingStatus, useEventListener } from 'onekijs-framework';
import React, { useCallback, useEffect, useRef } from 'react';
import { addStyle } from '../../../utils/style';
import { ListBodyProps, ListItem } from '../typings';
import ListItemComponent, { ListItemContent } from './ListItemComponent';
import ListLoadingComponent from './ListLoadingComponent';
import LoadingItem from './LoadingItem';
import StandardListComponent from './StandardListComponent';
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

const ListBodyComponent = <T extends any = any, I extends ListItem<T> = ListItem<T>>({
  autoRefresh,
  bodyRef,
  className,
  follow,
  height,
  items,
  ItemComponent = ListItemComponent,
  ItemLoadingComponent = LoadingItem,
  ItemContentComponent = ListItemContent,
  NotFoundComponent,
  keyboardNavigable,
  ListComponent = StandardListComponent,
  multiSelect,
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
  tail,
  totalSize,
  virtualItems,
  VirtualListComponent = DefaultVirtualListComponent,
  LoadingComponent = ListLoadingComponent,
}: ListBodyProps<T, I>) => {
  const scrollAlignRef = useRef<'center' | 'auto'>('center');
  const lastActiveItemUid = useRef<string>();
  const virtualRef = useRef<HTMLDivElement>(null!);
  const tailRef = useRef({
    lastScrollTop: 0,
    applyTail: true,
  });

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
      let nextItem: I | undefined;
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
              nextItem = get<any>(state.items, nextIndex.toString());
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
              nextItem = get<any>(state.items, activeIndex.toString());
              onItemClick(nextItem, activeIndex);
            }
            e.preventDefault();
            break;

          case 'Escape':
            if (onItemDeactivate && activeItem !== undefined) {
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

  const wheelRef = useRef(false);

  useEventListener('wheel', () => {
    wheelRef.current = true;
  });

  const mouseRef = useRef(false);

  useEventListener('mousedown', () => {
    mouseRef.current = true;
  });

  useEventListener('mouseup', () => {
    mouseRef.current = false;
  });

  useEffect(() => {
    const ref = parentRef ? parentRef : bodyRef;
    //console.log('parentRef', parentRef, 'ref', ref)
    const atBottom = () => {
      if (ref && ref.current) {
        const sh = ref.current.scrollHeight;
        const st = ref.current.scrollTop;
        const oh = ref.current.offsetHeight;
        if (oh === 0 || st === sh - oh) return true;
      }
      return false;
    };

    if (tail && scrollToIndex && totalSize && ref && ref.current) {
      // console.log(
      //   'scrollTop',
      //   ref.current.scrollTop,
      //   'mouseRef',
      //   mouseRef.current,
      //   'wheelRef',
      //   wheelRef.current,
      //   'applyTail',
      //   tailRef.current.applyTail,
      //   'atBottom',
      //   atBottom(),
      // );
      tailRef.current.lastScrollTop = ref.current.scrollTop;
      if (!atBottom() && (mouseRef.current || wheelRef.current)) {
        tailRef.current.applyTail = false;
      } else if (tailRef.current.applyTail === true || atBottom()) {
        tailRef.current.applyTail = true;
        scrollToIndex(state.total ? state.total - 1 : state.items ? state.items.length - 1 : 0, {
          align: 'start',
        });
      }
      wheelRef.current = false;
    } else if (scrollToIndex) {
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

  useEffect(() => {
    if (autoRefresh) {
      service.startAutoRefresh(autoRefresh);
    } else {
      service.stopAutoRefresh();
    }
    return () => {
      service.stopAutoRefresh();
    };
  }, [service, autoRefresh]);

  useEffect(() => {
    if (follow) {
      service.startFollow(follow);
    } else {
      service.stopFollow();
    }
    return () => {
      service.stopFollow();
    };
  }, [service, follow]);

  useEventListener('keydown', onKeyDown, false);

  const overflow = parentRef && parentRef !== bodyRef ? 'visible' : 'auto';
  if (virtualItems !== undefined) {
    if (virtualItems.length === 0) {
      if (isCollectionInitializing(service) || service.status === LoadingStatus.Fetching) {
        return null;
      }
      if (service.status === LoadingStatus.Loading) {
        return (
          <div className={className}>
            <LoadingComponent />
          </div>
        );
      } else if (NotFoundComponent) {
        return (
          <div className={className}>
            <NotFoundComponent />
          </div>
        );
      }
    }
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
          ref={virtualRef}
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
            ItemLoadingComponent={ItemLoadingComponent}
            ItemContentComponent={ItemContentComponent}
            virtualItems={virtualItems}
            onItemMouseEnter={onItemMouseEnter}
            onItemMouseLeave={onItemMouseLeave}
            onItemClick={onItemClick}
          />
        </div>
      </div>
    );
  } else {
    if (items.length === 0) {
      if (isCollectionInitializing(service) || service.status === LoadingStatus.Fetching) {
        return null;
      }
      if (service.status === LoadingStatus.Loading) {
        return (
          <div className={className}>
            <LoadingComponent />
          </div>
        );
      } else if (NotFoundComponent) {
        return (
          <div className={className}>
            <NotFoundComponent />
          </div>
        );
      }
    }
    if (height !== undefined) {
      style = addStyle(
        {
          maxHeight: `${typeof height === 'string' ? height : `${height}px`}`,
          overflow: 'auto',
        },
        style,
      );
    }
    return (
      <div ref={bodyRef} className={className} style={style}>
        <ListComponent
          items={items}
          ItemComponent={ItemComponent}
          ItemLoadingComponent={ItemLoadingComponent}
          ItemContentComponent={ItemContentComponent}
          onItemMouseEnter={onItemMouseEnter}
          onItemMouseLeave={onItemMouseLeave}
          onItemClick={onItemClick}
        />
      </div>
    );
  }
};

export default ListBodyComponent;

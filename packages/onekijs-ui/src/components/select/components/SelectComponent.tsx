import { useIsomorphicLayoutEffect, useEventListener } from '@oneki/core';
import { get } from '@oneki/utils';
import { AnonymousObject, ValidationStatus } from '@oneki/types';
import {
  Collection,
  isCollectionFetching,
  isCollectionLoading,
  Item,
  toCollectionItem,
  useCollection,
} from '@oneki/collection';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { addClassname } from '../../../utils/style';
import { useClickOutside, useFocusOutside } from '../../../utils/event';
import Dropdown from '../../dropdown';
import useListView from '../../list/hooks/useListView';
import { SelectOptionHandler, SelectOptionMeta, SelectOptionSelectionHandler, SelectProps } from '../typings';
import SelectInputComponent from './SelectInputComponent';
import SelectOptionComponent, { MultiSelectOptionComponent } from './SelectOptionComponent';
import ListBodyComponent from 'components/list/components/ListBodyComponent';

const findItem = (collection: Collection<any, SelectOptionMeta>, pattern: string): any => {
  if (collection.items === undefined) {
    return undefined;
  }
  return collection.items.find((i) => {
    if (i === undefined) {
      return false;
    }
    if (i.text === undefined) {
      return false;
    }
    return i.text.toLowerCase().startsWith(pattern.toLowerCase());
  });
};

const findItemIndex = (collection: Collection<any, SelectOptionMeta>, item?: Item<any, SelectOptionMeta>): number => {
  if (collection.items === undefined) {
    return -1;
  }
  return collection.items.findIndex((i) => {
    if (i === undefined) {
      return false;
    }
    if (i.id === undefined) {
      return false;
    }
    return i.id === item?.id;
  });
};

const diffItems = (
  previousItems: Item<any, SelectOptionMeta>[] | undefined,
  nextItems: Item<any, SelectOptionMeta>[] | undefined,
): { removed: Item<any, SelectOptionMeta>[]; added: Item<any, SelectOptionMeta>[] } => {
  if (previousItems === undefined && nextItems === undefined) {
    return {
      added: [],
      removed: [],
    };
  }

  if (previousItems === undefined && nextItems !== undefined) {
    return {
      added: nextItems,
      removed: [],
    };
  }

  if (previousItems !== undefined && nextItems === undefined) {
    return {
      added: [],
      removed: previousItems,
    };
  }

  if (previousItems !== undefined && nextItems !== undefined) {
    const previousItemIds = previousItems.map((previousItem) => previousItem.id);
    const nextItemIds = nextItems.map((nextItem) => nextItem.id);
    const added = nextItems.filter((nextItem) => !previousItemIds.includes(nextItem.id));
    const removed = previousItems.filter((previousItem) => !nextItemIds.includes(previousItem.id));
    return {
      added,
      removed,
    };
  }

  return {
    added: [],
    removed: [],
  };
};

const SelectComponent: FC<SelectProps<any>> = ({
  className = '',
  placeholder,
  items,
  InputComponent = SelectInputComponent,
  ItemComponent,
  autoFocus,
  value,
  onChange,
  onBlur: forwardBlur,
  onFocus: forwardFocus,
  height = '220px',
  multiple = false,
  status = ValidationStatus.None,
  size = 'medium',
}) => {
  const collection = useCollection(items);
  const [open, _setOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const stateRef = useRef<AnonymousObject>({});
  const currentProxyItem = useRef<Item<any, SelectOptionMeta> | undefined>();

  const currentScrollItem = useRef<Item<any, SelectOptionMeta> | undefined>();
  const currentScrollIndex = useRef<number | undefined>();
  const scrollToRef = useRef<{ index: number; align: 'start' | 'center' | 'end' | 'auto' } | undefined>();
  const [keyboardItem, setKeyboardItem] = useState<Item<any, SelectOptionMeta> | undefined>();
  const arrowItemRef = useRef<Item<any, SelectOptionMeta> | undefined>();

  const loading = isCollectionLoading(collection);
  const fetching = isCollectionFetching(collection);

  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);

  const tokens = useMemo(() => {
    return multiple && Array.isArray(value)
      ? value.map((v) => toCollectionItem(v, collection.getAdapter()) || '')
      : undefined;
  }, [value]);

  const previousTokensRef = useRef<Item<any, SelectOptionMeta>[] | undefined>();

  const proxyItem = useMemo(() => {
    const search = collection.getSearch();

    if (keyboardItem !== undefined) {
      return keyboardItem;
    }
    if (focus && search) {
      const item = findItem(collection, search.toString());
      if (item === undefined && !isCollectionFetching(collection)) {
        return get(collection, 'items.0');
      }
      return item;
    } else if (!multiple) {
      return toCollectionItem(value, collection.getAdapter());
    }
  }, [focus, collection, value, keyboardItem, multiple]);

  // const highlightItem = useCallback((item: SelectItem|undefined, highlight: boolean = true) => {
  //   if (highlight && currentHighlightedItem.current !== undefined) {
  //     collection.setMeta(currentHighlightedItem.current, 'highlighted', false);
  //   }
  //   currentHighlightedItem.current = highlight ? item : undefined;
  //   if (item != undefined) {
  //     collection.setMeta(item, 'highlighted', highlight);
  //   }
  // }, [collection])

  const setOpen = useCallback(
    (open) => {
      if (open) {
        arrowItemRef.current = undefined;
        const index = findItemIndex(collection, proxyItem);
        if (index !== undefined) {
          scrollToRef.current = {
            index,
            align: 'center',
          };
        }
      } else {
        currentScrollItem.current = undefined;
      }
      _setOpen(open);
    },
    [collection, proxyItem],
  );

  const onBlur = useCallback(() => {
    if (!stateRef.current.keepFocus) {
      if (collection.getSearch()) {
        collection.clearSearch();
      }
      if (keyboardItem !== undefined) {
        setKeyboardItem(undefined);
      }
      if (open) {
        setOpen(false);
      }
      if (focus) {
        setFocus(false);
        if (forwardBlur) {
          console.log('forwardBlur');
          forwardBlur();
        }
      }
    }
  }, [open, keyboardItem, collection]);

  const onFocus = useCallback(() => {
    if (!focus) {
      setFocus(true);
      if (forwardFocus) {
        forwardFocus();
      }
    }
  }, [open, keyboardItem, collection]);

  useClickOutside(containerRef, () => {
    onBlur();
  });

  useFocusOutside(containerRef, () => {
    onBlur();
  });

  const onInputChange = (nextValue: string) => {
    if (!open) {
      setOpen(true);
    }
    setKeyboardItem(undefined);
    collection.search(nextValue);
    scrollToRef.current = {
      index: 0,
      align: 'start',
    };
  };

  const onRemoveToken: SelectOptionHandler = useCallback(
    (item) => {
      if (onChange) {
        const nextValue = Array.isArray(tokens)
          ? tokens.filter((v) => v.id !== item.id).map((v) => v.data)
          : [item.data];
        onChange(nextValue);
      }
    },
    [tokens],
  );

  const onSelect: SelectOptionSelectionHandler = useCallback(
    (item, index, close) => {
      if (close === undefined) {
        close = !(multiple && !collection.getSearch());
      }
      if (close) {
        setOpen(false);
      }
      if (keyboardItem !== undefined) {
        if (!close) {
          arrowItemRef.current = keyboardItem;
        }
        setKeyboardItem(undefined);
      }
      if (collection.getSearch()) {
        collection.clearSearch();
      }
      if (onChange) {
        if (multiple) {
          if (item.meta?.selected) {
            onRemoveToken(item, index);
          } else {
            const nextValue = Array.isArray(value) ? value.concat([item.data]) : [item.data];
            onChange(nextValue);
          }
        } else {
          onChange(item.data);
        }
      }
    },
    [onChange, collection, multiple, onRemoveToken],
  );

  // const onItemEnter: SelectOptionHandler = useCallback((item) => {
  //   if (item !== undefined && item.id !== undefined && collection.getMeta(item.id)) {
  //     highlightItem(item, true);
  //   }
  // }, [collection, highlightItem])

  // const onItemLeave: SelectOptionHandler = useCallback((item) => {
  //   if (item !== undefined && item.id !== undefined && collection.getMeta(item.id)) {
  //     highlightItem(item, false);
  //   }
  // }, [collection, false])

  const onKeyDownCapture = useCallback((e: KeyboardEvent) => {
    if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(e.key)) {
      stateRef.current.keepFocus = true;
    }
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const currentIndex =
        keyboardItem === undefined && arrowItemRef.current
          ? findItemIndex(collection, arrowItemRef.current)
          : findItemIndex(collection, proxyItem);
      let nextIndex: number | undefined;
      let nextItem: Item<any, SelectOptionMeta> | undefined;
      switch (e.key) {
        case 'ArrowDown':
          if (open) {
            nextIndex = currentIndex === -1 ? 0 : currentIndex + 1;
            nextItem = get(collection.items, nextIndex.toString());
            if (nextItem !== undefined) {
              setKeyboardItem(nextItem);
            }
          } else if (!open && focus) {
            setOpen(true);
          }
          stateRef.current.keepFocus = false;
          break;

        case 'ArrowUp':
          if (open) {
            nextIndex = currentIndex <= 0 ? 0 : currentIndex - 1;
            nextItem = get(collection.items, nextIndex.toString());

            if (nextItem !== undefined) {
              setKeyboardItem(nextItem);
            }
          } else if (!open && focus) {
            setOpen(true);
          }
          stateRef.current.keepFocus = false;
          break;

        case 'Enter':
          if (open && currentIndex !== -1) {
            nextItem = get(collection.items, currentIndex.toString());
            if (nextItem !== undefined) {
              onSelect(nextItem, currentIndex, !(multiple && !collection.getSearch()));
            }
          } else if (!open && focus) {
            setOpen(true);
          }
          stateRef.current.keepFocus = false;
          break;

        case 'Escape':
          if (focus) {
            if (open) {
              setOpen(false);
            }
            setKeyboardItem(undefined);
            if (collection.getSearch()) {
              collection.clearSearch();
            }
          }

          stateRef.current.keepFocus = false;
          break;
      }
    },
    [collection, proxyItem, keyboardItem, onSelect, open, setOpen, focus, multiple],
  );

  useEffect(() => {
    if (proxyItem?.id !== currentProxyItem.current?.id) {
      if (currentProxyItem.current !== undefined) {
        const item = currentProxyItem.current;
        currentProxyItem.current = undefined;
        collection.setMeta(item, multiple ? 'highlighted' : 'selected', false);
      }
      if (proxyItem !== undefined && proxyItem.id !== undefined && collection.getMeta(proxyItem.id)) {
        currentProxyItem.current = proxyItem;
        collection.setMeta(proxyItem, multiple ? 'highlighted' : 'selected', true);
      }
    }

    if (multiple) {
      const diffTokens = diffItems(previousTokensRef.current, tokens);
      diffTokens.removed.forEach((token) => {
        if (token.id !== undefined) {
          collection.setMeta(token, 'selected', false);
        }
      });
      diffTokens.added.forEach((token) => {
        if (token.id !== undefined) {
          collection.setMeta(token, 'selected', true);
        }
      });
      previousTokensRef.current = tokens;
    }
  }, [value, collection, proxyItem, tokens]);

  const classNames = addClassname(
    `o-select o-select-size-${size} o-select-${open ? 'open' : 'close'}${
      status ? ' o-select-status-' + status.toLowerCase() : ''
    }`,
    className,
  );

  const { view: listView, scrollToIndex } = useListView({
    BodyComponent: ListBodyComponent,
    ItemComponent: ItemComponent ? ItemComponent : multiple ? MultiSelectOptionComponent : SelectOptionComponent,
    onItemClick: onSelect,
    // onItemMouseEnter: onItemEnter,
    // onItemMouseLeave: onItemLeave,
    collection,
    height,
    className: 'o-select-options',
  });

  const onDropDownUpdate = useCallback(() => {
    // const index = findItemIndex(collection, previousProxyItem.current);
    // if (open && scrollToIndex && index >= 0) {
    //   const align = keyboardItem ? 'auto': 'center';
    //   scrollToIndex(index, { 'align': align });
    // }
  }, [open, scrollToIndex, collection, proxyItem]);

  useIsomorphicLayoutEffect(() => {
    if (open && scrollToIndex) {
      const previousItem = currentScrollItem.current;
      const previousIndex = currentScrollIndex.current;
      currentScrollItem.current = proxyItem;
      const index = findItemIndex(collection, proxyItem);
      currentScrollIndex.current = index;

      if ((proxyItem?.id !== previousItem?.id || previousIndex !== index) && index >= 0) {
        const align = keyboardItem ? 'auto' : 'center';
        scrollToIndex(index, { align: align });
      }
    }
  }, [collection, scrollToIndex, open, proxyItem, keyboardItem]);

  useEventListener('keydown', onKeyDownCapture, true);
  useEventListener('keydown', onKeyDown, false);

  return (
    <div
      className={classNames}
      ref={setContainerRef}
      onMouseDown={() => (stateRef.current.keepFocus = true)}
      onMouseUp={() => (stateRef.current.keepFocus = false)}
    >
      <InputComponent
        placeholder={placeholder}
        setOpen={setOpen}
        open={open}
        loading={loading}
        fetching={fetching}
        onChange={onInputChange}
        value={proxyItem ? proxyItem.text : ''}
        focus={focus}
        onFocus={onFocus}
        onBlur={onBlur}
        tokens={tokens}
        multiple={multiple}
        onRemove={onRemoveToken}
        autoFocus={autoFocus}
      />
      <Dropdown refElement={containerRef} open={open} distance={5} onUpdate={onDropDownUpdate}>
        {listView}
      </Dropdown>
    </div>
  );
};

export default SelectComponent;

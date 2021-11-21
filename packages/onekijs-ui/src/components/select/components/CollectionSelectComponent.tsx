import {
  AnonymousObject,
  Collection,
  get,
  isCollectionFetching,
  isCollectionLoading,
  Item,
  useEventListener,
  useIsomorphicLayoutEffect,
  ValidationStatus,
} from 'onekijs-framework';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useClickOutside, useFocusOutside } from '../../../utils/event';
import { addClassname } from '../../../utils/style';
import Dropdown from '../../dropdown';
import ListBodyComponent from '../../list/components/ListBodyComponent';
import useListView from '../../list/hooks/useListView';
import { SelectComponentProps, SelectItem, SelectOptionHandler, SelectOptionSelectionHandler } from '../typings';
import SelectInputComponent from './SelectInputComponent';
import SelectOptionComponent, { MultiSelectOptionComponent } from './SelectOptionComponent';

const findItem = (dataSource: Collection<any, SelectItem<any>>, pattern: string): any => {
  if (dataSource.items === undefined) {
    return undefined;
  }
  return dataSource.items.find((i) => {
    if (i === undefined) {
      return false;
    }
    if (i.text === undefined) {
      return false;
    }
    return i.text.toLowerCase().startsWith(pattern.toLowerCase());
  });
};

const findItemIndex = (dataSource: Collection<any, SelectItem<any>>, item?: Item<any>): number => {
  if (dataSource.items === undefined) {
    return -1;
  }
  return dataSource.items.findIndex((i) => {
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
  previousItems: Item<any>[] | undefined,
  nextItems: Item<any>[] | undefined,
): { removed: Item<any>[]; added: Item<any>[] } => {
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

const CollectionSelectComponent: FC<SelectComponentProps> = ({
  className = '',
  placeholder,
  dataSource,
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
  const [open, _setOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const stateRef = useRef<AnonymousObject>({});
  const currentProxyItem = useRef<SelectItem<any> | undefined>();

  const currentScrollItem = useRef<SelectItem<any> | undefined>();
  const currentScrollIndex = useRef<number | undefined>();
  const scrollToRef = useRef<{ index: number; align: 'start' | 'center' | 'end' | 'auto' } | undefined>();
  const [keyboardItem, setKeyboardItem] = useState<SelectItem<any> | undefined>();
  const arrowItemRef = useRef<SelectItem<any> | undefined>();

  const loading = isCollectionLoading(dataSource);
  const fetching = isCollectionFetching(dataSource);

  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);

  const tokens = useMemo(() => {
    return multiple && Array.isArray(value) ? value.map((v) => dataSource.adapt(v)) : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const previousTokensRef = useRef<Item<any>[] | undefined>();

  const proxyItem = useMemo(() => {
    const search = dataSource.getSearch();

    if (keyboardItem !== undefined) {
      return keyboardItem;
    }
    if (focus && search) {
      const item = findItem(dataSource, search.toString());
      if (item === undefined && !isCollectionFetching(dataSource)) {
        return get(dataSource, 'items.0');
      }
      return item;
    } else if (!multiple) {
      return dataSource.adapt(value);
    }
  }, [focus, dataSource, value, keyboardItem, multiple]);

  // const highlightItem = useCallback((item: SelectItem|undefined, highlight: boolean = true) => {
  //   if (highlight && currentHighlightedItem.current !== undefined) {
  //     dataSource.setMeta(currentHighlightedItem.current, 'highlighted', false);
  //   }
  //   currentHighlightedItem.current = highlight ? item : undefined;
  //   if (item != undefined) {
  //     dataSource.setMeta(item, 'highlighted', highlight);
  //   }
  // }, [dataSource])

  const setOpen = useCallback(
    (open) => {
      if (open) {
        arrowItemRef.current = undefined;
        const index = findItemIndex(dataSource, proxyItem);
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
    [dataSource, proxyItem],
  );

  const onBlur = useCallback(() => {
    if (!stateRef.current.keepFocus) {
      if (dataSource.getSearch()) {
        dataSource.clearSearch();
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
          forwardBlur();
        }
      }
    }
  }, [open, keyboardItem, dataSource, forwardBlur, setOpen, focus]);

  const onFocus = useCallback(() => {
    if (!focus) {
      setFocus(true);
      if (forwardFocus) {
        forwardFocus();
      }
    }
  }, [focus, forwardFocus]);

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
    dataSource.search(nextValue);
    scrollToRef.current = {
      index: 0,
      align: 'start',
    };
  };

  const onRemoveToken: SelectOptionHandler<any, SelectItem<any>> = useCallback(
    (item) => {
      if (onChange) {
        const nextValue = Array.isArray(tokens)
          ? tokens.filter((v) => v.id !== item?.id).map((v) => v.data)
          : [item?.data];
        onChange(nextValue);
      }
    },
    [tokens, onChange],
  );

  const onSelect: SelectOptionSelectionHandler<any, SelectItem<any>> = useCallback(
    (item, index, close) => {
      if (close === undefined) {
        close = !(multiple && !dataSource.getSearch());
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
      if (dataSource.getSearch()) {
        dataSource.clearSearch();
      }
      if (onChange) {
        if (multiple) {
          if (item.selected) {
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
    [onChange, dataSource, multiple, onRemoveToken, keyboardItem, value, setOpen],
  );

  // const onItemEnter: SelectOptionHandler = useCallback((item) => {
  //   if (item !== undefined && item.id !== undefined && dataSource.getMeta(item.id)) {
  //     highlightItem(item, true);
  //   }
  // }, [dataSource, highlightItem])

  // const onItemLeave: SelectOptionHandler = useCallback((item) => {
  //   if (item !== undefined && item.id !== undefined && dataSource.getMeta(item.id)) {
  //     highlightItem(item, false);
  //   }
  // }, [dataSource, false])

  const onKeyDownCapture = useCallback((e: KeyboardEvent) => {
    if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(e.key)) {
      stateRef.current.keepFocus = true;
    }
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const currentIndex =
        keyboardItem === undefined && arrowItemRef.current
          ? findItemIndex(dataSource, arrowItemRef.current)
          : findItemIndex(dataSource, proxyItem);
      let nextIndex: number | undefined;
      let nextItem: Item<any> | undefined;
      switch (e.key) {
        case 'ArrowDown':
          if (open) {
            nextIndex = currentIndex === -1 ? 0 : currentIndex + 1;
            nextItem = get(dataSource.items, nextIndex.toString());
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
            nextItem = get(dataSource.items, nextIndex.toString());

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
            nextItem = get(dataSource.items, currentIndex.toString());
            if (nextItem !== undefined) {
              onSelect(nextItem, currentIndex, !(multiple && !dataSource.getSearch()));
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
            if (dataSource.getSearch()) {
              dataSource.clearSearch();
            }
          }

          stateRef.current.keepFocus = false;
          break;
      }
    },
    [dataSource, proxyItem, keyboardItem, onSelect, open, setOpen, focus, multiple],
  );

  useEffect(() => {
    if (proxyItem?.id !== currentProxyItem.current?.id) {
      if (currentProxyItem.current !== undefined) {
        const item = currentProxyItem.current;
        currentProxyItem.current = undefined;
        dataSource.setMeta('item', item, multiple ? 'highlighted' : 'selected', false);
      }
      if (proxyItem !== undefined && proxyItem.id !== undefined) {
        currentProxyItem.current = proxyItem;
        dataSource.setMeta('item', proxyItem, multiple ? 'highlighted' : 'selected', true);
      }
    }

    if (multiple) {
      const diffTokens = diffItems(previousTokensRef.current, tokens);
      diffTokens.removed.forEach((token) => {
        if (token.id !== undefined) {
          dataSource.setMeta('item', token, 'selected', false);
        }
      });
      diffTokens.added.forEach((token) => {
        if (token.id !== undefined) {
          dataSource.setMeta('item', token, 'selected', true);
        }
      });
      previousTokensRef.current = tokens;
    }
  }, [value, dataSource, proxyItem, tokens, multiple]);

  const classNames = addClassname(
    `o-select o-select-size-${size} o-select-${open ? 'open' : 'close'}${
      status ? ' o-select-status-' + status.toLowerCase() : ''
    }`,
    className,
  );

  const optionsRef = useRef<HTMLDivElement>(null);
  const { items: selectItems, isVirtual, totalSize, virtualItems, scrollToIndex } = useListView({
    dataSource,
    height: height,
    ref: optionsRef,
  });

  const onDropDownUpdate = useCallback(() => undefined, []);

  useIsomorphicLayoutEffect(() => {
    if (open && scrollToIndex) {
      const previousItem = currentScrollItem.current;
      const previousIndex = currentScrollIndex.current;
      currentScrollItem.current = proxyItem;
      const index = findItemIndex(dataSource, proxyItem);
      currentScrollIndex.current = index;

      if ((proxyItem?.id !== previousItem?.id || previousIndex !== index) && index >= 0) {
        const align = keyboardItem ? 'auto' : 'center';
        scrollToIndex(index, { align: align });
      }
    }
  }, [dataSource, scrollToIndex, open, proxyItem, keyboardItem]);

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
        <ListBodyComponent
          className="o-select-options"
          bodyRef={optionsRef}
          height={height}
          ItemComponent={ItemComponent ? ItemComponent : multiple ? MultiSelectOptionComponent : SelectOptionComponent}
          items={selectItems}
          onItemClick={onSelect}
          totalSize={totalSize}
          virtualItems={isVirtual ? virtualItems : undefined}
        />
      </Dropdown>
    </div>
  );
};

export default CollectionSelectComponent;

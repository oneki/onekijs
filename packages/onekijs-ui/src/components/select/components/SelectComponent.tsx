import { AnonymousObject, Collection, get, isCollectionFetching, isCollectionLoading, Item, toCollectionItem, useCollection, useEventListener, useIsomorphicLayoutEffect } from 'onekijs-core';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useClickOutside, useFocusOutside } from '../../../utils/event';
import Dropdown from '../../dropdown';
import useListView from '../../list/hooks/useListView';
import { SelectOptionHandler, SelectOptionMeta, SelectProps } from '../typings';
import SelectInputComponent from './SelectInputComponent';
import SelectOptionComponent, { MultiSelectOptionComponent } from './SelectOptionComponent';

const findItem = (collection: Collection<any, SelectOptionMeta>, pattern: string): any => {
  if (collection.items === undefined) {
    return undefined;
  }
  return collection.items.find(i => {
    if (i === undefined) {
      return false
    }
    if (i.text === undefined) {
      return false;
    }
    return i.text.toLowerCase().startsWith(pattern.toLowerCase())
  })
}

const findItemIndex = (collection: Collection<any, SelectOptionMeta>, item?: Item<any, SelectOptionMeta>): number => {
  if (collection.items === undefined) {
    return -1;
  }
  return collection.items.findIndex(i => {
    if (i === undefined) {
      return false
    }
    if (i.id === undefined) {
      return false;
    }
    return i.id === item?.id
  })
};

const diffItems = (previousItems: Item<any, SelectOptionMeta>[] | undefined, nextItems: Item<any, SelectOptionMeta>[] | undefined): { 'removed': Item<any, SelectOptionMeta>[], 'added': Item<any, SelectOptionMeta>[] } => {
  if (previousItems === undefined && nextItems === undefined) {
    return {
      'added': [],
      'removed': [],
    }
  }

  if (previousItems === undefined && nextItems !== undefined) {
    return {
      'added': nextItems,
      'removed': [],
    }
  }  

  if (previousItems !== undefined && nextItems === undefined) {
    return {
      'added': [],
      'removed': previousItems,
    }
  }   

  if (previousItems !== undefined && nextItems !== undefined) {
    const previousItemIds = previousItems.map(previousItem => previousItem.id)
    const nextItemIds = nextItems.map(nextItem => nextItem.id)
    const added = nextItems.filter(nextItem => !previousItemIds.includes(nextItem.id))
    const removed = previousItems.filter(previousItem => !nextItemIds.includes(previousItem.id))
    return {
      added,
      removed
    }
  }

  return {
    'added': [],
    'removed': [],
  }  
}

const SelectComponent: FC<SelectProps<any>> = ({
  className = '',
  placeholder,
  items,
  InputComponent = SelectInputComponent,
  ItemComponent,
  autoFocus,
  value,
  onChange,
  height = '220px',
  multiple = false,
}) => {
  const collection = useCollection(items);
  const [open, _setOpen] = useState(false);
  const [focus, setFocus] = useState(!!autoFocus);
  const stateRef = useRef<AnonymousObject>({});
  const previousProxyItem = useRef<Item<any, SelectOptionMeta>|undefined>();

  const previousScrollItem = useRef<Item<any, SelectOptionMeta>|undefined>();
  const previousScrollIndex = useRef<number|undefined>();
  const scrollToRef = useRef<{ index: number, align: 'start' | 'center' | 'end' | 'auto' } | undefined>();
  const [keyboardItem, setKeyboardItem] = useState<Item<any, SelectOptionMeta>|undefined>()
  //const initialValueRef = useRef(value);

  const loading = isCollectionLoading(collection);
  const fetching = isCollectionFetching(collection);

  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);

  const tokens = useMemo(() => {
    return multiple && Array.isArray(value) ? value.map(v => toCollectionItem(v, collection.getAdapter()) || '') : undefined;
  }, [value])

  const previousTokensRef = useRef<Item<any, SelectOptionMeta>[] | undefined>();

  const onBlur = useCallback(() => {
    if (!stateRef.current.keepFocus) {
      setFocus(false);
      setOpen(false);
    }
  }, []);

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
    }    
  };

  const proxyItem = useMemo(() => {
    const search = collection.getSearch();
    
    if (keyboardItem !== undefined) {
      return keyboardItem;
    }
    if (search) {
      let item = findItem(collection, search.toString());
      if (item === undefined && !isCollectionFetching(collection)) {
        return get(collection, 'items.0');
      }
      return item;
    } else if (!multiple) {
      return toCollectionItem(value, collection.getAdapter());
    }
  }, [collection, value, keyboardItem, multiple]);


  const setOpen = useCallback((open) => {
    if (open) {
      const index = findItemIndex(collection, proxyItem);
      if (index !== undefined) {
        scrollToRef.current = {
          index,
          align: 'center',
        }
      }     
    } else {
      previousScrollItem.current = undefined;
    }
    _setOpen(open)
  }, [collection, proxyItem])  

  const onRemoveToken: SelectOptionHandler = useCallback((item) => {
    if (onChange) {
      const nextValue = (Array.isArray(tokens)) ? tokens.filter(v => v.id !== item.id).map(v => v.data) : [item.data]
      onChange(nextValue);
    }

  }, [tokens])  

  const onSelect: SelectOptionHandler = useCallback(
    (item, index) => {
      setOpen(false);
      if (keyboardItem !== undefined) {
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
            const nextValue = (Array.isArray(value)) ? value.concat([item.data]) : [item.data]
            onChange(nextValue);
          }
        } else {
          onChange(item.data);
        }
        
      }
    },
    [onChange, collection, multiple, onRemoveToken],
  );

  const onItemEnter: SelectOptionHandler = useCallback((item) => {
    if (item !== undefined && item.id !== undefined && collection.getMeta(item.id)) {
      collection.setMeta(item, 'highlighted', true);
    }
  }, [collection])

  const onItemLeave: SelectOptionHandler = useCallback((item) => {
    if (item !== undefined && item.id !== undefined && collection.getMeta(item.id)) {
      collection.setMeta(item, 'highlighted', false);
    }
  }, [collection])  



  const onKeyDownCapture = useCallback((e:KeyboardEvent) => {	
    if (['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) {
      stateRef.current.keepFocus = true;
    }
    
  }, [])

  const onKeyDown = useCallback((e:KeyboardEvent) => {
    const currentIndex = findItemIndex(collection, proxyItem);
    let nextIndex: number|undefined;
    let nextItem: Item<any,SelectOptionMeta>|undefined;
    switch(e.key) {
      case 'ArrowDown':
        if (open) {
          nextIndex = (currentIndex === -1) ? 0 : currentIndex + 1;
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
          nextIndex = (currentIndex <= 0) ? 0 : currentIndex - 1;
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
            onSelect(nextItem, currentIndex);
          }
        } else if (!open && focus) {
          setOpen(true);
        }
        stateRef.current.keepFocus = false;
        break;               
    }
  }, [collection, proxyItem, onSelect, open, setOpen, focus])



  useEffect(() => {
    if (proxyItem?.id !== previousProxyItem.current?.id) {
      if (previousProxyItem.current !== undefined) {
        const item = previousProxyItem.current
        previousProxyItem.current = undefined;
        collection.setMeta(item, multiple ? 'highlighted' : 'selected', false);
      } 
      if (proxyItem !== undefined && proxyItem.id !== undefined && collection.getMeta(proxyItem.id)) {
        previousProxyItem.current = proxyItem;
        collection.setMeta(proxyItem, multiple ? 'highlighted' : 'selected', true);
      }
    }

    if (multiple) {
      const diffTokens = diffItems(previousTokensRef.current, tokens)
      diffTokens.removed.forEach(token => {
        if (token.id !== undefined) {
          collection.setMeta(token, 'selected', false);
        }
      })      
      diffTokens.added.forEach(token => {
        if (token.id !== undefined) {
          collection.setMeta(token, 'selected', true);
        }
      })
      previousTokensRef.current = tokens;
    }
  }, [value, collection, proxyItem, tokens]);
  
  const classNames = [className, `o-select-${open ? 'open' : 'close'}`].join(' ')

  const { view: listView, scrollToIndex } = useListView({
    ItemComponent: ItemComponent ? ItemComponent : multiple ? MultiSelectOptionComponent : SelectOptionComponent, 
    onItemClick: onSelect, 
    onItemMouseEnter: onItemEnter,
    onItemMouseLeave: onItemLeave,
    collection, 
    height, 
    className: 'o-select-options',
  });

  const onDropDownUpdate = useCallback(() => {
    const index = findItemIndex(collection, previousProxyItem.current);
    if (open && scrollToIndex && index >= 0) {
      const align = keyboardItem ? 'auto': 'center';
      scrollToIndex(index, { 'align': align });
    }
  }, [open, scrollToIndex, collection, proxyItem])  
  
  useIsomorphicLayoutEffect(() => {
    if (open && scrollToIndex) {
      const previousItem = previousScrollItem.current;
      const previousIndex = previousScrollIndex.current
      previousScrollItem.current = proxyItem;
      const index = findItemIndex(collection, proxyItem);
      previousScrollIndex.current = index
      
      if ((proxyItem?.id !== previousItem?.id || previousIndex !== index) && index >= 0) {
        const align = keyboardItem ? 'auto': 'center';
        scrollToIndex(index, { 'align': align });
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
        onFocus={() => setFocus(true)}
        onBlur={onBlur}
        tokens={tokens}
        multiple={multiple}
        onRemove={onRemoveToken}
      />
      <Dropdown refElement={containerRef} open={open} distance={5} onUpdate={onDropDownUpdate}>
        {listView}
      </Dropdown>
    </div>
  );
};

export default SelectComponent;

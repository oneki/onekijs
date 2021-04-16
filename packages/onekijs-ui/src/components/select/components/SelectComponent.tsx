import { AnonymousObject, Collection, get, isCollectionFetching, isCollectionLoading, Item, toCollectionItem, useCollection, useEventListener, useIsomorphicLayoutEffect } from 'onekijs-core';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useClickOutside } from '../../../utils/event';
import Dropdown from '../../dropdown';
import useListView from '../../list/hooks/useListView';
import { SelectOptionHandler, SelectOptionMeta, SelectProps } from '../typings';
import SelectInputComponent from './SelectInputComponent';
import SelectOptionComponent from './SelectOptionComponent';

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

const SelectComponent: FC<SelectProps<any>> = ({
  className = '',
  placeholder,
  items,
  InputComponent = SelectInputComponent,
  ItemComponent = SelectOptionComponent,
  autoFocus,
  value,
  onChange,
  height = '220px',
}) => {
  const collection = useCollection(items);
  const [open, _setOpen] = useState(false);
  const [focus, setFocus] = useState(!!autoFocus);
  const stateRef = useRef<AnonymousObject>({});
  const previousProxyItem = useRef<Item<any, SelectOptionMeta>|undefined>();
  const scrollToRef = useRef<{ index: number, align: 'start' | 'center' | 'end' | 'auto' } | undefined>();
  const [keyboardItem, setKeyboardItem] = useState<Item<any, SelectOptionMeta>|undefined>()
  //const initialValueRef = useRef(value);

  const loading = isCollectionLoading(collection);
  const fetching = isCollectionFetching(collection);
  // const searchingRef = useRef(false);

  // const delayOpen = useMemo(() => {
  //   return loading && !open;
  // }, [open, loading]);

  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);

  const onBlur = useCallback(() => {
    if (!stateRef.current.keepFocus) {
      setFocus(false);
      setOpen(false);
    }
  }, []);

  useClickOutside(containerRef, () => {
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
    } else {
      return toCollectionItem(value, collection.getAdapter());
    }
  }, [collection, value, keyboardItem]);

  const setOpen = useCallback((open) => {
    if (open) {
      const index = findItemIndex(collection, proxyItem);
      if (index !== undefined) {
        scrollToRef.current = {
          index,
          align: 'center',
        }
      }     
    }
    _setOpen(open)
  }, [collection, proxyItem])  

  const onSelect: SelectOptionHandler = useCallback(
    (item) => {
      setOpen(false);
      if (keyboardItem !== undefined) {
        setKeyboardItem(undefined);
      }
      if (collection.getSearch()) {
        collection.clearSearch();
      }
      if (onChange) {
        onChange(item.data);
      }
    },
    [onChange, collection],
  );

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
          console.log('nextItem', nextItem)
          if (nextItem !== undefined) {
            setKeyboardItem(nextItem);
          }
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
        }
        stateRef.current.keepFocus = false;
        break;

      case 'Enter':
        if (open && currentIndex !== -1) {
          nextItem = get(collection.items, currentIndex.toString());
          if (nextItem !== undefined) {
            onSelect(nextItem, currentIndex);
          }
        }
        stateRef.current.keepFocus = false;
        break;               
    }
  }, [collection, proxyItem, onSelect, open])

  useEffect(() => {
    if (proxyItem?.id !== previousProxyItem.current?.id) {
      if (previousProxyItem.current !== undefined) {
        const item = previousProxyItem.current
        previousProxyItem.current = undefined;
        collection.setMeta(item, 'selected', false);
      } 
      if (proxyItem !== undefined && proxyItem.id !== undefined && collection.getMeta(proxyItem.id)) {
        previousProxyItem.current = proxyItem;
        collection.setMeta(proxyItem, 'selected', true);
      }
    }
  }, [value, collection, proxyItem]);
  
  const classNames = [className, `o-select-${open ? 'open' : 'close'}`].join(' ')

  const { view: listView, scrollToIndex } = useListView({ItemComponent, onItemClick: onSelect, collection, height, className: 'o-select-options'});
  
  useIsomorphicLayoutEffect(() => {
    
    if (open && scrollToIndex && proxyItem !== previousProxyItem.current) {
      const index = findItemIndex(collection, proxyItem);
      if (index >= 0) {
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
      />
      <Dropdown refElement={containerRef} open={open}>
        {listView}
      </Dropdown>
    </div>
  );
};

export default SelectComponent;

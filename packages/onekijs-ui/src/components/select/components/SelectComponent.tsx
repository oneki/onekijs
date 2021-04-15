import useListView from '../../list/hooks/useListView';
import { AnonymousObject, Collection, get, isCollectionFetching, isCollectionLoading, Item, LoadingStatus, toCollectionItem, useCollection, useIsomorphicLayoutEffect } from 'onekijs-core';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useClickOutside } from '../../../utils/event';
import Dropdown from '../../dropdown';
import { SelectOptionHandler, SelectOptionMeta, SelectProps } from '../typings';
import SelectInputComponent from './SelectInputComponent';
import SelectOptionComponent from './SelectOptionComponent';

const selectItem = (collection: Collection<any, SelectOptionMeta>, pattern: string): any => {
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

const findItemIndex = (collection: Collection<any, SelectOptionMeta>, item: Item<any, SelectOptionMeta>): number|undefined => {
  if (collection.items === undefined) {
    return undefined;
  }
  return collection.items.findIndex(i => {
    if (i === undefined) {
      return false
    }
    if (i.id === undefined) {
      return false;
    }
    return i.id === item.id
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
  const previousValueRef = useRef<Item<any, SelectOptionMeta>>();
  const selectionDoneRef = useRef<boolean>(true);

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

  const setOpen = useCallback((open) => {
    if (open && selectionDoneRef.current) {
      selectionDoneRef.current = false
      if (collection.getSearch()) {
        collection.clearSearch()
      }
    } else if (!open) {
      selectionDoneRef.current = true
    }
    _setOpen(open)
  }, [collection])



  useClickOutside(containerRef, () => {
    onBlur();
  });

  const onInputChange = (nextValue: string) => {
    if (!open) {
      setOpen(true);
    }
    selectionDoneRef.current = false;
    collection.search(nextValue);
  };

  const selectedItem = useMemo(() => {
    if (!focus || selectionDoneRef.current) {
      return toCollectionItem(value, collection.getAdapter());
    } else {
      const search = collection.getSearch()
      if (search !== undefined) {
        const item = selectItem(collection, search.toString());
        if (item === undefined) {
          return get(collection, 'items.0');
        }
        return item
      } else {
        return toCollectionItem(value, collection.getAdapter());
      }
    }
  }, [collection, value, focus]);

  const onSelect: SelectOptionHandler = useCallback(
    (item) => {
      selectionDoneRef.current = true;
      if (onChange) {
        onChange(item.data);
      }
      setOpen(false);

    },
    [onChange, collection],
  );

  useEffect(() => {
    if (value !== previousValueRef.current) {
      const item = toCollectionItem(value, collection.getAdapter());
      const previousItem = toCollectionItem(previousValueRef.current, collection.getAdapter());
      collection.setMeta(previousItem, 'selected', false);
      collection.setMeta(item, 'selected', true);
    }
    previousValueRef.current = value;
  }, [value, collection]);
  
  const classNames = [className, `o-select-${open ? 'open' : 'close'}`].join(' ')

  const { view: listView, scrollToIndex } = useListView({ItemComponent, onItemClick: onSelect, collection, height, className: 'o-select-options'});
  
  useIsomorphicLayoutEffect(() => {
    if (open && scrollToIndex) {
      let index: number|undefined = undefined;
      if (true) {
        index = findItemIndex(collection, selectedItem);
      } else {
        const offset = collection.getOffset() || 0;
        if (
          collection.status !== LoadingStatus.Loading &&
          collection.status !== LoadingStatus.Fetching &&
          offset === 0
        ) {
          index = 0;
        }
      }
      if (index !== undefined && index >= 0) {
        scrollToIndex(index, {'align': 'center'});
      }
    }

  }, [collection, selectedItem, scrollToIndex, open]);

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
        value={selectedItem ? selectedItem.text : ''}
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

import { AnonymousObject, Collection, get, isCollectionFetching, isCollectionLoading, Item, toCollectionItem, useCollection } from 'onekijs-core';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useClickOutside } from '../../../utils/event';
import Dropdown from '../../dropdown';
import { SelectInternalProps, SelectOptionHandler, SelectOptionMeta, SelectProps } from '../typings';
import SelectInputComponent from './SelectInputComponent';
import SelectOptionsComponent from './SelectOptionsComponent';

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

const SelectComponent: FC<SelectProps<any>> = (props) => {
  const { items, ...selectInternalProps } = props;
  if (Array.isArray(items)) {
    return <SelectDataComponent {...selectInternalProps} items={items} />;
  } else {
    return <SelectInternalComponent {...selectInternalProps} collection={items} />;
  }
};

const SelectDataComponent: FC<Omit<SelectProps, 'items'> & { items: any[] }> = (props) => {
  const { items, ...selectInternalProps } = props;
  const collection = useCollection(items);
  return <SelectInternalComponent {...selectInternalProps} collection={collection} />;
};

const SelectInternalComponent: FC<SelectInternalProps> = ({
  className = '',
  placeholder,
  collection,
  InputComponent = SelectInputComponent,
  autoFocus,
  value,
  onChange,
}) => {
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
        <SelectOptionsComponent items={collection} onItemClick={onSelect} />
      </Dropdown>
    </div>
  );
};

export default SelectComponent;

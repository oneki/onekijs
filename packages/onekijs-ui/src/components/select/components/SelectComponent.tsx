import { AnonymousObject, get } from 'onekijs-core';
import React, { FC, useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { LoadingStatus, Item, useCollection, toCollectionItem } from 'onekijs-core';
import { useClickOutside } from '../../../utils/event';
import Dropdown from '../../dropdown';
import { SelectInternalProps, SelectOptionMeta, SelectOptionHandler, SelectProps } from '../typings';
import SelectInputComponent from './SelectInputComponent';
import SelectOptionsComponent from './SelectOptionsComponent';

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
  className,
  placeholder,
  collection,
  InputComponent = SelectInputComponent,
  autoFocus,
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(!!autoFocus);
  const stateRef = useRef<AnonymousObject>({});
  const previousValueRef = useRef<Item<any, SelectOptionMeta>>();

  const loading = useMemo(() => {
    return collection.status === LoadingStatus.Loading || collection.status === LoadingStatus.PartialLoading;
  }, [collection]);

  const delayOpen = useMemo(() => {
    return loading && !open;
  }, [open, loading]);

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

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!open) {
      setOpen(true);
    }
    collection.search(e.target.value);
  };

  const selectedItem = useMemo(() => {
    if (!focus) {
      return toCollectionItem(value, collection.getAdapter());
    } else {
      if (collection.getSearch()) {
        return get(collection, 'items.0');
      } else {
        return toCollectionItem(value, collection.getAdapter());
      }
    }
  }, [collection, value, focus]);

  const onSelect: SelectOptionHandler = useCallback(
    (item) => {
      if (onChange) {
        onChange(item.data);
      }
      setOpen(false);
      collection.clearSearch();
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

  return (
    <div
      className={className}
      ref={setContainerRef}
      onClick={() => setFocus(true)}
      onMouseDown={() => (stateRef.current.keepFocus = true)}
      onMouseUp={() => (stateRef.current.keepFocus = false)}
    >
      <InputComponent
        placeholder={placeholder}
        onIconClick={() => !delayOpen && setOpen(!open)}
        open={open && !delayOpen}
        loading={loading}
        onChange={onInputChange}
        value={selectedItem.text}
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

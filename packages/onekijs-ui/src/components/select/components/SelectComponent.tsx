import { AnonymousObject, get } from 'onekijs';
import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
import { LoadingStatus } from '../../../lib/typings';
import { isCollection, toCollectionItem } from '../../../utils/collection';
import { useClickOutside } from '../../../utils/event';
import Dropdown from '../../dropdown';
import { SelectProps } from '../typings';
import SelectInputComponent from './SelectInputComponent';
import SelectOptionsComponent from './SelectOptionsComponent';

const SelectComponent: FC<SelectProps<any>> = ({
  className,
  placeholder,
  items: collection,
  InputComponent = SelectInputComponent,
  autoFocus,
  value,
}) => {
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(!!autoFocus);
  const stateRef = useRef<AnonymousObject>({});

  const loading = useMemo(() => {
    const loading = isCollection(collection)
      ? collection.status === LoadingStatus.Loading || collection.status === LoadingStatus.PartialLoading
      : false;
    return loading;
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
    if (isCollection(collection)) {
      collection.search(e.target.value);
    }
  };

  const selectedItem = useMemo(() => {
    if (!focus) {
      if (isCollection(collection) && (!collection.items || collection.items.length === 0)) {
        return toCollectionItem(value, collection.getAdapter());
      } else {
        return value;
      }
    } else {
      const search = isCollection(collection) ? collection.getSearch() : undefined;
      if (search) {
        return isCollection(collection) ? get(collection, 'items.0') : collection[0];
      } else {
        return isCollection(collection) ? toCollectionItem(value, collection.getAdapter()) : value;
      }
    }
  }, [collection, value, focus]);

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
        <SelectOptionsComponent items={collection} />
      </Dropdown>
    </div>
  );
};

export default SelectComponent;

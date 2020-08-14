import { AnonymousObject, get } from 'onekijs';
import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
import { LoadingStatus } from '../../../lib/typings';
import { isCollection } from '../../../utils/collection';
import { useClickOutside } from '../../../utils/event';
import Dropdown from '../../dropdown';
import { adapt } from '../../list/utils';
import { SelectProps } from '../typings';
import SelectInputComponent from './SelectInputComponent';
import SelectOptionsComponent from './SelectOptionsComponent';

const SelectComponent: FC<SelectProps<any>> = ({
  className,
  placeholder,
  data,
  InputComponent = SelectInputComponent,
  adapter,
  autoFocus,
  value,
}) => {
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(!!autoFocus);
  const stateRef = useRef<AnonymousObject>({});

  const loading = useMemo(() => {
    const loading = isCollection(data)
      ? data.status === LoadingStatus.Loading || data.status === LoadingStatus.PartialLoading
      : false;
    return loading;
  }, [data]);

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
    if (isCollection(data)) {
      data.search(e.target.value);
    }
  };

  const selectedItem = useMemo(() => {
    if (!focus) {
      if (isCollection(data) && (!data.data || data.data.length === 0)) {
        return adapt(value, undefined, adapter);
      } else {
        return adapt(undefined, undefined, adapter);
      }
    } else {
      const search = isCollection(data) ? data.getSearch() : undefined;
      if (search) {
        const item = isCollection(data) ? get(data, 'data.0') : data[0];
        const meta = isCollection(data) ? get(data, 'meta.0') : undefined;
        return adapt(item, meta, adapter);
      } else {
        return adapt(value, undefined, adapter);
      }
    }
  }, [data, adapter, value, focus]);

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
        <SelectOptionsComponent data={data} adapter={adapter} />
      </Dropdown>
    </div>
  );
};

export default SelectComponent;

import {
  AnonymousObject,
  Collection,
  first,
  get,
  isCollectionFetching,
  isCollectionLoading,
  Item,
  last,
  useEventListener,
  useLazyRef,
  ValidationStatus,
} from 'onekijs-framework';
import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
import { useClickOutside, useFocusOutside } from '../../../utils/event';
import { addClassname } from '../../../utils/style';
import Dropdown from '../../dropdown';
import ListBodyComponent from '../../list/components/ListBodyComponent';
import useListView from '../../list/hooks/useListView';
import { CollectionSelectProps, SelectItem, SelectOptionHandler } from '../typings';
import SelectInputComponent from './SelectInputComponent';
import SelectOptionComponent, { MultiSelectOptionComponent } from './SelectOptionComponent';

const findItem = (controller: Collection<any, SelectItem<any>>, pattern: string): any => {
  if (controller.items === undefined) {
    return undefined;
  }
  return controller.items.find((i) => {
    if (i === undefined) {
      return false;
    }
    if (i.text === undefined) {
      return false;
    }
    return i.text.toLowerCase().startsWith(pattern.toLowerCase());
  });
};

const findItemIndex = (controller: Collection<any, SelectItem<any>>, item?: Item<any>): number => {
  if (controller.items === undefined) {
    return -1;
  }
  return controller.items.findIndex((i) => {
    if (i === undefined) {
      return false;
    }
    if (i.id === undefined) {
      return false;
    }
    return i.id === item?.id;
  });
};

const scrollToSelected = (controller: Collection<any, SelectItem<any>>) => {
  const scrollTo: { index: number; align: 'start' | 'center' | 'end' | 'auto' } = { index: 0, align: 'start' };
  const selectedUid = first(controller.state.selected);
  if (selectedUid !== undefined) {
    const selectedItem = controller.getItem(selectedUid);
    const selectedIndex = findItemIndex(controller, selectedItem);
    if (selectedIndex > 0) {
      scrollTo.index = selectedIndex;
      scrollTo.align = 'center';
    }
  }
  return scrollTo;
};

const CollectionSelectComponent: FC<CollectionSelectProps> = ({
  className = '',
  placeholder,
  controller,
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
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const stateRef = useRef<AnonymousObject>({});
  const service = controller.asService();

  const loading = isCollectionLoading(controller);
  const fetching = isCollectionFetching(controller);

  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const scrollToRef = useLazyRef<{ index: number; align: 'start' | 'center' | 'end' | 'auto' } | undefined>(() => {
    return scrollToSelected(controller);
  });

  const tokens = useMemo<SelectItem<any>[]>(() => {
    return (controller.state.selected || [])
      .map((uid) => service.getItem(uid))
      .filter((item) => item !== undefined) as SelectItem<any>[];
  }, [controller.state.selected, service]);

  const proxyItem = useMemo(() => {
    const search = controller.getSearch();

    if (controller.state.active !== undefined && controller.state.active?.length > 0) {
      return controller.state.active[0];
    }
    if (focus && search) {
      const item = findItem(controller, search.toString());
      if (item === undefined && !isCollectionFetching(controller)) {
        return get(controller, 'items.0');
      }
      return item;
    } else if (!multiple) {
      return controller.adapt(value);
    }
  }, [focus, controller, value, multiple]);

  const onBlur = useCallback(() => {
    if (!stateRef.current.keepFocus) {
      if (service.getSearch()) {
        service.clearSearch();
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
  }, [open, service, forwardBlur, setOpen, focus]);

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
    service.search(nextValue);
    if (service.items.length > 0 && service.items[0] !== undefined) {
      service.setActive('item', service.items[0]);
    }
    scrollToRef.current = { index: 0, align: 'start' };
    if (!open) {
      setOpen(true);
    }
  };

  const onRemoveToken: SelectOptionHandler<any, SelectItem<any>> = useCallback(
    (item) => {
      service.removeSelected('item', item);
      if (onChange) {
        const nextValue = (service.state.selected || []).map((uid) => service.getItem(uid)?.data);
        onChange(nextValue);
      }
    },
    [service, onChange],
  );

  const onSelect = useCallback(
    (item: Item, index: number) => {
      if (multiple && !item.selected) {
        service.addSelected('item', item);
      } else if (multiple && item.selected) {
        service.removeSelected('item', item);
      } else if (!item.selected) {
        service.setSelected('item', item);
      } else {
        service.setSelected('item', []);
      }

      if (service.getSearch()) {
        service.clearSearch();
      }

      if (!multiple) {
        setOpen(false);
      }

      if (onChange) {
        if (multiple) {
          if (item.selected) {
            onRemoveToken(item, index);
          } else {
            const nextValue = (service.state.selected || []).map((uid) => service.getItem(uid)?.data);
            onChange(nextValue);
          }
        } else {
          onChange(item.data);
        }
      }
    },
    [onChange, service, multiple, onRemoveToken, setOpen],
  );

  const onKeyDownCapture = useCallback((e: KeyboardEvent) => {
    if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(e.key)) {
      stateRef.current.keepFocus = true;
    }
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowUp':
          if (!open && focus) {
            // check if there is a selected item and if so, activate the next item
            // for it's a multiselect or there is no selected item, activate the first one
            let nextIndex = 0;
            if (multiple || !service.state.selected || service.state.selected.length === 0) {
              nextIndex =
                e.key === 'ArrowDown'
                  ? 0
                  : Math.max(0, service.state.selected === undefined ? 0 : service.state.selected.length - 1);
            } else {
              const selectedUid = e.key === 'ArrowDown' ? first(service.state.selected) : last(service.state.selected);
              if (selectedUid !== undefined) {
                const selectedItem = service.getItem(selectedUid);
                const selectedIndex = findItemIndex(service, selectedItem);
                if (selectedIndex !== undefined) {
                  nextIndex =
                    e.key === 'ArrowDown'
                      ? Math.min(selectedIndex + 1, service.items.length)
                      : Math.max(0, selectedIndex - 1);
                }
              }
            }
            console.log('nextIndex', nextIndex);
            const nextItem = service.items[nextIndex];
            if (nextItem !== undefined) {
              scrollToRef.current = {
                index: nextIndex,
                align: 'auto',
              };
              service.setActive('item', nextItem);
            }
            setOpen(true);
          }
          stateRef.current.keepFocus = false;
          break;

        case 'Enter':
          if (!open && focus) {
            setOpen(true);
          }
          stateRef.current.keepFocus = false;
          break;

        case 'Escape':
          if (focus) {
            if (open) {
              setOpen(false);
            }
            if (service.getSearch()) {
              service.clearSearch();
            }
          }
          stateRef.current.keepFocus = false;
          break;
      }
    },
    [service, open, setOpen, focus, multiple, scrollToRef],
  );

  const [dropping, setDropping] = useState(false);
  const [collapsing, setCollapsing] = useState(false);

  const style: React.CSSProperties = {};

  if (dropping || collapsing) {
    style['zIndex'] = 1001;
  }

  const classNames = addClassname(
    `o-select o-select-size-${size} o-select-${open ? 'open' : 'close'}${
      status ? ' o-select-status-' + status.toLowerCase() : ''
    }`,
    className,
  );

  const optionsRef = useRef<HTMLDivElement>(null);
  const { items: selectItems, isVirtual, totalSize, virtualItems, scrollToIndex } = useListView({
    controller,
    height: height,
    ref: optionsRef,
  });

  const onOpen = useCallback(() => {
    if (scrollToRef.current === undefined) {
      scrollToRef.current = scrollToSelected(service);
    }
    scrollToIndex(scrollToRef.current.index, { align: scrollToRef.current.align });
    scrollToRef.current = undefined;
    setDropping(true);
  }, [service, scrollToRef, scrollToIndex]);

  const onClosed = useCallback(() => {
    scrollToRef.current = undefined;
    service.setActive('item', []);
    setCollapsing(false);
  }, [scrollToRef, service]);

  const onDropDownUpdate = useCallback(() => undefined, []);

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
        style={style}
      />
      <Dropdown
        refElement={containerRef}
        open={open}
        distance={0}
        onUpdate={onDropDownUpdate}
        animationTimeout={200}
        onDropStart={onOpen}
        onCollapseStart={() => {
          setCollapsing(true);
        }}
        onDropDone={() => setDropping(false)}
        onCollapseDone={onClosed}
      >
        <ListBodyComponent
          className="o-select-options"
          bodyRef={optionsRef}
          height={height}
          ItemComponent={ItemComponent ? ItemComponent : multiple ? MultiSelectOptionComponent : SelectOptionComponent}
          items={selectItems}
          onItemSelect={onSelect}
          totalSize={totalSize}
          virtualItems={isVirtual ? virtualItems : undefined}
          scrollToIndex={scrollToIndex}
          service={controller.asService()}
          state={controller.state}
          keyboardNavigable={true}
          multiSelect={multiple}
        />
      </Dropdown>
    </div>
  );
};

export default CollectionSelectComponent;

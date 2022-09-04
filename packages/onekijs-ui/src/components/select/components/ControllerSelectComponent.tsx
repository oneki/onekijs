import {
  AnonymousObject,
  Collection,
  first,
  get,
  isCollectionFetching,
  isCollectionLoading,
  Item,
  last,
  Primitive,
  useEventListener,
  ValidationStatus,
} from 'onekijs-framework';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useClickOutside, useFocusOutside } from '../../../utils/event';
import { addClassname } from '../../../utils/style';
import useDropdown from '../../dropdown/hooks/useDropdown';
import ListBodyComponent from '../../list/components/ListBodyComponent';
import LoadingItem from '../../list/components/LoadingItem';
import useListView from '../../list/hooks/useListView';
import { SelectConfigContext } from '../hooks/useSelectConfig';
import { ControllerSelectProps, SelectConfig, SelectItem, SelectOptionHandler } from '../typings';
import SelectInputComponent from './SelectInputComponent';
import SelectNotFoundComponent from './SelectNotFoundComponent';
import SelectOptionComponent, { MultiSelectOptionComponent, SelectOptionContent } from './SelectOptionComponent';

const findItem = (controller: Collection<any, SelectItem<any>>, pattern: string): SelectItem<any> | undefined => {
  let result = undefined;
  if (controller.items === undefined) {
    return undefined;
  }
  for (const item of controller.items) {
    if (item === undefined || item.text === undefined) {
      continue;
    }
    if (item.text.toLowerCase().startsWith(pattern.toLowerCase())) {
      return item;
    }
    if (result === undefined && item.text.toLowerCase().includes(pattern.toLowerCase())) {
      result = item;
    }
  }
  return result;
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

const ControllerSelectComponent: FC<ControllerSelectProps> = ({
  attachDropdownToBody = false,
  className = '',
  placeholder,
  controller,
  InputComponent = SelectInputComponent,
  IconComponent,
  OptionContentComponent = SelectOptionContent,
  OptionComponent = SelectOptionComponent,
  OptionLoadingComponent = LoadingItem,
  MultiOptionsComponent = MultiSelectOptionComponent,
  NotFoundComponent = SelectNotFoundComponent,
  autoFocus,
  value,
  onChange,
  onBlur: forwardBlur,
  onFocus: forwardFocus,
  height = '220px',
  multiple = false,
  status = ValidationStatus.None,
  size = 'medium',
  nullable = true,
  minChars = 0,
  openOnFocus = false,
  clickable = true,
  dropdownWidthModifier = 'same',
  preload = 100,
  increment = 100,
  animationMs = 200,
  disabled,
}) => {
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const stateRef = useRef<AnonymousObject>({});
  const service = controller.asService();

  const loading = isCollectionLoading(controller);
  const fetching = isCollectionFetching(controller);

  const containerRef = useRef<HTMLDivElement>(null);

  const previousSearchRef = useRef<Primitive>();

  const config: SelectConfig = useMemo(() => {
    return {
      OptionContentComponent,
      OptionLoadingComponent,
    };
  }, [OptionContentComponent, OptionLoadingComponent]);

  const tokens = useMemo<SelectItem<any>[]>(() => {
    return (controller.state.selected || [])
      .map((uid) => service.getItem(uid))
      .filter((item) => item !== undefined) as SelectItem<any>[];
  }, [controller.state.selected, service]);

  const showActiveRef = useRef(false);

  const proxyItem = useMemo(() => {
    const search = controller.getSearch();
    if (showActiveRef.current && controller.state.active && controller.state.active.length > 0) {
      return controller.getItem(controller.state.active[0]);
    } else if (focus && search) {
      const item = findItem(controller, search.toString());
      if (item === undefined && !isCollectionFetching(controller)) {
        return get(controller, 'items.0');
      }
      return item;
    } else if (controller.state.active && controller.state.active.length > 0) {
      return controller.getItem(controller.state.active[0]);
    }
    if (!multiple) {
      return controller.adapt(value);
    }
  }, [focus, controller, value, multiple]);

  const clearSearch = useCallback(() => {
    setTimeout(service.clearSearch, animationMs);
  }, [service, animationMs]);

  const onBlur = useCallback(() => {
    if (!stateRef.current.keepFocus) {
      if (service.getSearch()) {
        clearSearch();
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
  }, [open, service, forwardBlur, setOpen, focus, clearSearch]);

  const onFocus = useCallback(() => {
    if (!focus) {
      setFocus(true);
      if (openOnFocus && !open) {
        setOpen(true);
      }
      if (forwardFocus) {
        forwardFocus();
      }
    }
  }, [focus, forwardFocus, openOnFocus, open]);

  useClickOutside(containerRef, onBlur);

  useFocusOutside(containerRef, onBlur);

  useEffect(() => {
    const search = controller.getSearch();
    if (open && focus && search && search !== previousSearchRef.current) {
      const item = findItem(controller, search.toString());
      const activated = get<string>(controller.state.active, '0');
      if (item !== undefined && !isCollectionFetching(controller)) {
        previousSearchRef.current = search;
        if (item.uid !== activated) {
          controller.setActive('item', item);
        }
      }
    }
  }, [controller, focus, open]);

  const onInputChange = (nextValue: string | null) => {
    showActiveRef.current = false;
    if (nextValue === null) {
      onSelect(null);
    } else {
      service.search(nextValue);
      if (!open) {
        setOpen(true);
      }
    }
  };

  const onRemoveToken: SelectOptionHandler<any, SelectItem<any>> = useCallback(
    (item) => {
      if (!disabled) {
        service.removeSelected('item', item);
        if (onChange) {
          const nextValue = (service.state.selected || []).map((uid) => service.getItem(uid)?.data);
          onChange(nextValue);
        }
      }
    },
    [service, onChange, disabled],
  );

  const onActivate = useCallback(
    (item: Item) => {
      showActiveRef.current = true;
      service.setActive('item', item);
    },
    [service],
  );

  const onSelect = useCallback(
    (item: Item | null, index = 0) => {
      if (!multiple) {
        setOpen(false);
        service.setActive('item', []);
      }

      if (service.getSearch()) {
        clearSearch();
      }

      if (multiple && item && !item.selected) {
        service.addSelected('item', item);
      } else if (multiple && item && item.selected) {
        service.removeSelected('item', item);
      } else if (item && !item.selected) {
        service.setSelected('item', item);
      } else {
        service.setSelected('item', []);
      }

      if (onChange) {
        if (multiple) {
          if (item && item.selected) {
            onRemoveToken(item, index);
          } else {
            const nextValue = (service.state.selected || []).map((uid) => service.getItem(uid)?.data);
            onChange(nextValue);
          }
        } else {
          onChange(item ? item.data : null);
        }
      }
    },
    [onChange, service, multiple, onRemoveToken, setOpen, clearSearch],
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
            const nextItem = service.items[nextIndex];
            if (nextItem !== undefined) {
              service.setActive('item', nextItem);
            }
            setOpen(true);
          }
          stateRef.current.keepFocus = false;
          break;

        case 'Enter':
          if (focus) {
            if (!open || (open && !multiple)) {
              setOpen(!open);
            }
          }
          stateRef.current.keepFocus = false;
          break;

        case 'Escape':
          if (focus) {
            if (open) {
              setOpen(false);
            }
            if (service.getSearch()) {
              clearSearch();
            }
          }
          stateRef.current.keepFocus = false;
          break;
      }
    },
    [service, open, setOpen, focus, multiple, clearSearch],
  );

  const style: React.CSSProperties = {};

  const classNames = addClassname(
    `o-select ${disabled ? 'o-select-disabled' : 'o-select-enabled'} o-select-size-${size} o-select-${
      open ? 'open' : 'close'
    }${status ? ' o-select-status-' + status.toLowerCase() : ''}${multiple ? ' o-select-multiple' : ''}`,
    className,
  );

  const optionsRef = useRef<HTMLDivElement>(null);
  const {
    items: selectItems,
    isVirtual,
    totalSize,
    virtualItems,
    scrollToIndex,
  } = useListView({
    controller,
    height: height,
    ref: optionsRef,
    preload,
    increment,
  });

  const onOpen = useCallback(() => {
    const scrollTo: { index: number; align: 'start' | 'center' | 'end' | 'auto' } = { index: 0, align: 'start' };
    const selectedUid = first(service.state.selected);
    if (selectedUid !== undefined) {
      const selectedItem = service.getItem(selectedUid);
      const selectedIndex = findItemIndex(service, selectedItem);
      if (selectedItem !== undefined && selectedIndex > 0) {
        scrollTo.index = selectedIndex;
        scrollTo.align = 'center';
        service.setActive('item', selectedItem);
      }
    }
    scrollToIndex(scrollTo.index, { align: scrollTo.align });
  }, [service, scrollToIndex]);

  const onClosed = useCallback(() => {
    service.setActive('item', []);
  }, [service]);

  const [Dropdown, triggerRef] = useDropdown();

  useEventListener('keydown', onKeyDownCapture, true);
  useEventListener('keydown', onKeyDown, false);

  return (
    <SelectConfigContext.Provider value={config}>
      <div
        className={classNames}
        ref={containerRef}
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
          nullable={nullable}
          IconComponent={IconComponent}
          clickable={clickable}
          minChars={minChars}
          ref={triggerRef}
          disabled={disabled}
        />
        <Dropdown
          attachToBody={attachDropdownToBody}
          open={open}
          distance={0}
          animationTimeout={animationMs}
          onDropStart={onOpen}
          onCollapseDone={onClosed}
          placement="bottom"
          widthModifier={dropdownWidthModifier}
          className={className}
          zIndex={attachDropdownToBody ? 2000 : undefined}
        >
          <ListBodyComponent
            className="o-select-options"
            bodyRef={optionsRef}
            height={height}
            ItemComponent={multiple ? MultiOptionsComponent : OptionComponent}
            ItemLoadingComponent={OptionLoadingComponent}
            ItemContentComponent={OptionContentComponent}
            NotFoundComponent={NotFoundComponent}
            items={selectItems}
            onItemSelect={onSelect}
            totalSize={totalSize}
            virtualItems={isVirtual ? virtualItems : undefined}
            scrollToIndex={scrollToIndex}
            service={controller.asService()}
            state={controller.state}
            keyboardNavigable={true}
            multiSelect={multiple}
            onItemActivate={onActivate}
          />
        </Dropdown>
      </div>
    </SelectConfigContext.Provider>
  );
};

export default ControllerSelectComponent;

import {
  AnonymousObject,
  eventLocks,
  first,
  get,
  isCollectionFetching,
  isCollectionLoading,
  last,
  LoadingStatus,
  Primitive,
  useEventListener,
  useIsomorphicLayoutEffect,
  useThrottle,
  ValidationStatus,
} from 'onekijs-framework';
import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { useClickOutside, useFocusOutside } from '../../../utils/event';
import { addClassname } from '../../../utils/style';
import useDropdown from '../../dropdown/hooks/useDropdown';
import ListBodyComponent from '../../list/components/ListBodyComponent';
import LoadingItem from '../../list/components/LoadingItem';
import useListView from '../../list/hooks/useListView';
import { SelectServiceContext } from '../hooks/useSelectService';
import {
  ControllerSelectProps,
  SelectController,
  SelectItem,
  SelectListComponentProps,
  SelectOptionHandler,
  SelectState,
} from '../typings';
import { findSelectItem, findSelectItemIndex } from '../util';
import SelectInputComponent from './SelectInputComponent';
import SelectNotFoundComponent from './SelectNotFoundComponent';
import SelectOptionComponent, { SelectOptionContent } from './SelectOptionComponent';

const DefaultSelectListComponent = <T extends any = any, I extends SelectItem<T> = SelectItem<T>>(
  props: SelectListComponentProps<T, I>,
) => {
  const {
    items: selectItems,
    isVirtual,
    totalSize,
    virtualItems,
    scrollToIndex,
  } = useListView({
    controller: props.controller,
    height: props.height,
    ref: props.optionsRef,
    preload: props.preload,
    overscan: props.overscan,
    increment: props.increment,
  });

  return (
    <ListBodyComponent
      {...props}
      className="o-select-options"
      bodyRef={props.optionsRef}
      items={selectItems}
      totalSize={totalSize}
      virtualItems={isVirtual ? virtualItems : undefined}
      scrollToIndex={scrollToIndex}
      keyboardNavigable={true}
      service={props.controller?.asService()}
      state={props.controller.state}
    />
  );
};

const ControlledSelectComponent = <
  T = any,
  I extends SelectItem<T> = SelectItem<T>,
  S extends SelectState<T, I> = SelectState<T, I>,
  C extends SelectController<T, I, S> = SelectController<T, I, S>,
>({
  attachDropdownToBody = false,
  className = '',
  placeholder,
  controller,
  InputComponent = SelectInputComponent,
  IconComponent,
  OptionContentComponent = SelectOptionContent,
  OptionComponent = SelectOptionComponent,
  OptionLoadingComponent = LoadingItem,
  MultiOptionsComponent = SelectOptionComponent,
  NotFoundComponent = SelectNotFoundComponent,
  autoFocus,
  value,
  onChange,
  onBlur: forwardBlur,
  onFocus: forwardFocus,
  height = 220,
  multiple = false,
  status = ValidationStatus.None,
  size = 'medium',
  nullable,
  minChars = 0,
  openOnFocus = false,
  searchable = true,
  dropdownWidthModifier = 'min',
  preload = 50,
  increment = 50,
  animationMs = 200,
  disabled,
  defaultValue,
  defaultValueLoading,
  required = false,
  sameWidth = true,
  overscan,
  clickable = true,
  ListComponent = DefaultSelectListComponent,
  autoCompleteSearch = true,
  maxDisplayTokens,
  validateValue = true,
  open: externalOpen,
}: ControllerSelectProps<T, I, S, C>) => {
  if (nullable === undefined) {
    nullable = !required;
  }
  const [initialized, setInitialized] = useState(false);
  const [internalOpen, setOpen] = useState(false);
  const open = initialized && (externalOpen ?? internalOpen);

  const [focus, setFocus] = useState(false);
  const stateRef = useRef<AnonymousObject>({});
  const service = controller.asService();
  if (!service.config) {
    service.config = {
      attachDropdownToBody,
      className,
      placeholder,
      InputComponent,
      IconComponent,
      OptionContentComponent,
      OptionComponent,
      OptionLoadingComponent,
      MultiOptionsComponent,
      NotFoundComponent,
      autoFocus,
      value,
      onChange,
      onBlur: forwardBlur,
      onFocus: forwardFocus,
      height,
      multiple,
      status,
      size,
      nullable,
      minChars,
      openOnFocus,
      searchable,
      clickable,
      dropdownWidthModifier,
      preload,
      increment,
      animationMs,
      disabled,
      defaultValue,
      defaultValueLoading,
      sameWidth,
      overscan,
      autoCompleteSearch,
      maxDisplayTokens,
      validateValue,
    };
  } else {
    service.config = {
      attachDropdownToBody,
      className,
      placeholder,
      InputComponent: service.config.InputComponent,
      IconComponent: service.config.IconComponent,
      OptionContentComponent: service.config.OptionContentComponent,
      OptionComponent: service.config.OptionComponent,
      OptionLoadingComponent: service.config.OptionLoadingComponent,
      MultiOptionsComponent: service.config.MultiOptionsComponent,
      NotFoundComponent: service.config.NotFoundComponent,
      autoFocus,
      value,
      onChange,
      onBlur: forwardBlur,
      onFocus: forwardFocus,
      height,
      multiple,
      status,
      size,
      nullable,
      minChars,
      openOnFocus,
      searchable,
      clickable,
      dropdownWidthModifier,
      preload,
      increment,
      animationMs,
      disabled,
      defaultValue,
      defaultValueLoading,
      sameWidth,
      overscan,
      autoCompleteSearch,
      maxDisplayTokens,
      validateValue,
    };
  }

  const id = useId();

  const loading = isCollectionLoading(controller);
  const fetching = isCollectionFetching(controller);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const previousSearchRef = useRef<Primitive>();

  const previousProxyItemRef = useRef<I>();

  const tokens = useMemo<I[]>(() => {
    return (controller.state.selected || [])
      .map((uid) => service.getItem(uid))
      .filter((item) => item !== undefined) as I[];
  }, [controller.state.selected, service]);

  const showActiveRef = useRef(false);

  const proxyItem = useMemo(() => {
    const search = controller.getSearch();
    const active = controller.state.active;
    const selected = controller.state.selected;
    if (showActiveRef.current && active && active.length > 0) {
      if (multiple && selected && selected.find((i) => i === active[0])) {
        return undefined;
      }
      return controller.getItem(active[0]);
    } else if (focus && search) {
      const item = autoCompleteSearch ? findSelectItem(controller, search.toString()) : controller.items[0];
      if (item === undefined && !isCollectionFetching(controller)) {
        return get<any>(controller, 'items.0');
      }
      return item;
    } else if (active && active.length > 0) {
      if (multiple && selected && selected.find((i) => i === active[0])) {
        return undefined;
      }
      return controller.getItem(active[0]);
    }
    if (!multiple) {
      return controller.adapt(value as T | null | undefined);
    }
  }, [focus, controller, value, multiple, autoCompleteSearch]);

  const optionsRef = useRef<HTMLDivElement | null>(null);

  const update = useCallback(() => {
    if (optionsRef.current && get<any>(service, 'config.sameWidth')) {
      if (optionsRef.current.scrollWidth > optionsRef.current.clientWidth) {
        optionsRef.current.style.width = `${
          optionsRef.current.scrollWidth + optionsRef.current.offsetWidth - optionsRef.current.clientWidth
        }px`;
      }
    }
  }, [service]);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const throttleUpdate = useThrottle(update, 20);

  const resizeObserver = useMemo(() => {
    return new ResizeObserver(() => {
      update();
    });
  }, [update]);

  useIsomorphicLayoutEffect(() => {
    const el = optionsRef;
    if (el.current) {
      resizeObserver.observe(el.current);
    }
    return () => {
      if (el.current) {
        resizeObserver.unobserve(el.current);
      }
    };
  }, [optionsRef.current]);

  useIsomorphicLayoutEffect(() => {
    setTimeout(throttleUpdate, 0);
  });

  // // Create an observer instance linked to the callback function
  // const observer = new MutationObserver(callback);

  // // Start observing the target node for configured mutations
  // observer.observe(targetNode, config);

  // // Later, you can stop observing
  // observer.disconnect();

  useEffect(() => {
    if (proxyItem && service.scrollToIndex) {
      const scrollTo: { index: number; align: 'start' | 'center' | 'end' | 'auto' } = { index: 0, align: 'start' };
      const index = findSelectItemIndex(service, proxyItem);
      const previousIndex = findSelectItemIndex(service, previousProxyItemRef.current);
      if (Math.abs(index - previousIndex) > 1) {
        if (index > 0) {
          scrollTo.index = index;
          scrollTo.align = 'center';
        }
        service.scrollToIndex(scrollTo.index, { align: scrollTo.align });
      }
      previousProxyItemRef.current = proxyItem;
    }
  }, [proxyItem, service]);

  const clearSearch = useCallback(() => {
    setTimeout(service.clearSearch, animationMs);
  }, [service, animationMs]);

  useEffect(() => {
    setInitialized(true);
  }, [setInitialized]);

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
      if (controller.state.status === LoadingStatus.NotReady) {
        controller.initialLoad();
      }
      setFocus(true);
      if (openOnFocus && !open) {
        setOpen(true);
      }
      if (forwardFocus) {
        forwardFocus();
      }
    }
  }, [controller, focus, forwardFocus, openOnFocus, open]);

  useClickOutside(containerRef, onBlur);

  useFocusOutside(containerRef, onBlur);

  useEffect(() => {
    const search = controller.getSearch();
    if (open && focus && search && search !== previousSearchRef.current) {
      const item = autoCompleteSearch ? findSelectItem(controller, search.toString()) : controller.items[0];
      const activated = get(controller.state.active, '0');
      if (item !== undefined && !isCollectionFetching(controller)) {
        previousSearchRef.current = search;
        if (item.uid !== activated) {
          controller.setActive('item', item);
        }
      }
    }
  }, [controller, focus, open, id, autoCompleteSearch]);

  useEffect(() => {
    if (!multiple) {
      if (value) {
        service.setSelected('item', service.adapt(value as T | null | undefined));
      } else {
        service.setSelected('item', []);
      }
    } else {
      if (value && Array.isArray(value)) {
        service.setSelected(
          'item',
          value.map((v) => service.adapt(v)),
        );
      } else {
        service.setSelected('item', []);
      }
    }
    service.check();
  }, [multiple, value, service]);

  // Manage the result of a check after a change of the value from the outside
  // if the selected item is invalid, do a onChange to remove the value
  useEffect(() => {
    if (validateValue) {
      const search = service.getSearch();
      const invalidItems = service.state.invalidItems || [];
      if (!search && invalidItems.length > 0) {
        if (multiple) {
          const validTokens: SelectItem[] = [];
          tokens.forEach((t) => {
            const invalidToken = invalidItems.find((i) => t.uid === i.uid);
            if (!invalidToken) {
              validTokens.push(t);
            }
          });
          if (validTokens.length !== tokens.length && onChange) {
            let validData = validTokens.map((t) => t.data);
            if (validData.length === 0 && Array.isArray(service.state.validDefaultValue)) {
              validData = service.state.validDefaultValue;
            }
            onChange(validData);
          }
        } else {
          const currentItem = service.adapt(value as T | null | undefined);
          if (invalidItems.find((i) => i.id === currentItem.id)) {
            // set the defaultValue if it's a valid value otherwise set null
            onChange && onChange(service.state.validDefaultValue || null);
          }
        }
      } else if (!search && !nullable && (value === null || value === undefined) && service.state.validDefaultValue) {
        onChange && onChange(service.state.validDefaultValue);
      }
    }
  }, [
    service,
    multiple,
    onChange,
    value,
    tokens,
    service.state.invalidItems,
    service.state.validDefaultValue,
    nullable,
    validateValue,
  ]);

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

  const onRemoveToken: SelectOptionHandler<T, I> = useCallback(
    (item) => {
      if (!disabled) {
        service.removeSelected('item', item);
        if (onChange) {
          const nextValue = (service.state.selected || []).map((uid) => service.getItem(uid)?.data);
          onChange(nextValue as T[]);
        }
      }
    },
    [service, onChange, disabled],
  );

  const onActivate = useCallback(
    (item: I) => {
      showActiveRef.current = true;
      service.setActive('item', item);
    },
    [service],
  );

  const onSelect = useCallback(
    (item: I | null, index = 0) => {
      if (!multiple) {
        setOpen(false);
        service.setActive('item', []);
      }

      if (service.getSearch()) {
        clearSearch();
      }

      const isSelected = item?.selected;

      if (multiple && item && !isSelected) {
        service.addSelected('item', item);
      } else if (multiple && item && isSelected) {
        service.removeSelected('item', item);
      } else if (item && !isSelected) {
        service.setSelected('item', item);
      } else {
        service.setSelected('item', []);
      }

      if (onChange) {
        if (multiple) {
          if (item && isSelected) {
            onRemoveToken(item, index);
          } else {
            const nextValue = (service.state.selected || []).map((uid) => service.getItem(uid)?.data);
            onChange(nextValue as T[]);
          }
        } else {
          onChange(item ? (item.data as T) : null);
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
                const selectedIndex = findSelectItemIndex(service, selectedItem);
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
            if (!open) {
              setOpen(!open);
            }
          }
          stateRef.current.keepFocus = false;
          break;

        case 'Escape':
          if (focus) {
            if (open && eventLocks.isLockedBy('escape', id)) {
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
    [service, open, setOpen, focus, multiple, clearSearch, id],
  );

  const style: React.CSSProperties = {};

  const classNames = addClassname(
    `o-select ${disabled ? 'o-select-disabled' : 'o-select-enabled'} o-select-size-${size} o-select-${
      open ? 'open' : 'close'
    }${status ? ' o-select-status-' + status.toLowerCase() : ''}${multiple ? ' o-select-multiple' : ''}`,
    className,
  );

  const onOpen = useCallback(() => {
    eventLocks.lock('escape', id);
    if (service.scrollToIndex) {
      const scrollTo: { index: number; align: 'start' | 'center' | 'end' | 'auto' } = { index: 0, align: 'start' };
      const selectedUid = first(service.state.selected);
      if (selectedUid !== undefined) {
        const selectedItem = service.getItem(selectedUid);
        const selectedIndex = findSelectItemIndex(service, selectedItem);
        if (selectedItem !== undefined && selectedIndex >= 0) {
          scrollTo.index = selectedIndex;
          scrollTo.align = 'center';
          service.setActive('item', selectedItem);
        }
      }
      service.scrollToIndex(scrollTo.index, { align: scrollTo.align });
    }
  }, [service, id]);

  const onClosed = useCallback(() => {
    eventLocks.unlock('escape', id);
    service.setActive('item', []);
    service.setHighlighted('item', []);
  }, [service, id]);

  const [Dropdown, triggerRef] = useDropdown();

  useEventListener('keydown', onKeyDownCapture, true);
  useEventListener('keydown', onKeyDown, false);
  return (
    <SelectServiceContext.Provider value={service}>
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
          value={autoCompleteSearch ? (proxyItem ? proxyItem.text : '') : controller.getSearch() || ''}
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
          searchable={searchable}
          clickable={clickable}
          minChars={minChars}
          ref={triggerRef}
          disabled={disabled}
          autoCompleteSearch={autoCompleteSearch}
          maxDisplayTokens={maxDisplayTokens}
        />
        <Dropdown
          attachToBody={attachDropdownToBody}
          open={open}
          distance={0}
          animationTimeout={animationMs}
          onDropStart={onOpen}
          onCollapseDone={onClosed}
          placement="bottom-start"
          widthModifier={dropdownWidthModifier}
          width={service.state.width ? `${service.state.width}px` : undefined}
          className={className}
          zIndex={attachDropdownToBody ? 2000 : undefined}
        >
          <ListComponent
            className="o-select-options"
            height={height}
            ItemComponent={multiple ? MultiOptionsComponent : OptionComponent}
            ItemLoadingComponent={OptionLoadingComponent}
            ItemContentComponent={OptionContentComponent}
            NotFoundComponent={NotFoundComponent}
            onItemSelect={onSelect}
            onItemUnselect={onSelect}
            controller={controller}
            keyboardNavigable={true}
            multiSelect={multiple}
            onItemActivate={onActivate}
            optionsRef={optionsRef}
            preload={preload}
            increment={increment}
          />
        </Dropdown>
      </div>
    </SelectServiceContext.Provider>
  );
};

export default ControlledSelectComponent;

import { isItemLoading } from 'onekijs-framework';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import Checkbox from '../../checkbox';
import LoadingItem from '../../list/components/LoadingItem';
import { ListItemProps } from '../../list/typings';
import { useSelectService } from '../hooks/useSelectService';
import { SelectItem } from '../typings';
import { getGroupText } from '../util';

export const SelectOptionContent = <T, I extends SelectItem<T> = SelectItem<T>>({ item }: ListItemProps<T, I>) => {
  return <div className={`o-select-option-data${item.group ? ' o-select-option-group-item' : ''}`}>{item.text}</div>;
};

export const SelectOptionGroup = <T, I extends SelectItem<T> = SelectItem<T>>({ item }: ListItemProps<T, I>) => {
  return <div className="o-select-option-group">{getGroupText(item)}</div>;
};

const SelectOptionComponent = <T, I extends SelectItem<T> = SelectItem<T>>(props: ListItemProps<T, I>) => {
  const { item, index, onClick, onMouseEnter, onMouseLeave } = props;
  const service = useSelectService<T, I>();
  const previousItem = service.items[index - 1];
  const displayGroup = getGroupText(item) !== getGroupText(previousItem);

  const {
    OptionContentComponent = SelectOptionContent,
    OptionLoadingComponent = LoadingItem,
    OptionGroupComponent = SelectOptionGroup,
  } = service.config || {};
  let clickable = !!onClick && !item?.disabled;
  let hoverable = true;
  if (item?.data === undefined && isItemLoading(item)) {
    clickable = false;
    hoverable = false;
  }

  const classNames = useMemo(() => {
    const classNames = ['o-select-option'];
    if (item?.disabled) {
      classNames.push('o-select-option-disabled');
    }
    if (clickable) {
      classNames.push('o-select-option-clickable');
    }
    if (hoverable && item?.highlighted) {
      classNames.push('o-select-option-highlighted');
    }
    if (item?.selected) {
      classNames.push('o-select-option-selected');
    }
    if (item?.active) {
      classNames.push('o-select-option-active');
    }

    return classNames.join(' ');
  }, [item, clickable, hoverable]);

  const fixClickRef = useRef({
    mouseDown: '',
    clicked: false,
  });

  const onItemClick = useCallback(
    (item: I, index: number) => {
      if (!fixClickRef.current.clicked) {
        clickable && onClick && item && onClick(item, index);
      }
    },
    [clickable, onClick],
  );

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      service.setItemWidth(item, ref.current.clientWidth);
    }
  })

  if (isItemLoading(item)) {
    return <OptionLoadingComponent />;
  }

  if (!item || !item.data) return null;

  return (
    <>
      {displayGroup && <OptionGroupComponent {...props} key="group" />}
      <div
        className={classNames}
        onClick={() => onItemClick(item, index)}
        onMouseEnter={() => hoverable && onMouseEnter && item && onMouseEnter(item, index)}
        onMouseLeave={() => hoverable && onMouseLeave && item && onMouseLeave(item, index)}
        key="content"
      >
        <div style={{display: 'flex'}} ref={ref}>
          {/* {multiple && <div className="o-select-option-icon">{meta?.selected? <>&#10003;</>:<></>}</div> } */}
          {service.config?.multiple && (
            <Checkbox
              value={item?.selected ? true : false}
              onChange={() => onItemClick(item, index)}
              color="currentColor"
              className="o-select-option-multiple-checkbox"
              key="checkbox"
            ></Checkbox>
          )}
          <OptionContentComponent {...props} onClick={() => onItemClick(item, index)} key="option_content" />
        </div>
      </div>
    </>
  );
};

SelectOptionComponent.displayName = 'SelectOptionComponent';

export default React.memo(SelectOptionComponent) as typeof SelectOptionComponent;

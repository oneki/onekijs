import { isItemLoading } from 'onekijs-framework';
import React, { FC, useMemo } from 'react';
import Checkbox from '../../checkbox';
import LoadingItem from '../../list/components/LoadingItem';
import { useSelectService } from '../hooks/useSelectService';
import { SelectOptionProps } from '../typings';
import { getGroupText } from '../util';

export const MultiSelectOptionComponent: FC<SelectOptionProps> = React.memo((props) => {
  return <SelectOptionComponent {...props} multiple={true} />;
});

MultiSelectOptionComponent.displayName = 'MultiSelectOptionComponent';

export const SelectOptionContent: FC<SelectOptionProps> = ({ item }) => {
  return <div className={`o-select-option-data${item.group ? ' o-select-option-group-item' : ''}`}>{item.text}</div>;
};

export const SelectOptionGroup: FC<SelectOptionProps> = ({ item }) => {
  return <div className="o-select-option-group">{getGroupText(item)}</div>;
};

const SelectOptionComponent: FC<SelectOptionProps> = React.memo((props) => {
  const { item, index, onClick, onMouseEnter, onMouseLeave, multiple = false } = props;
  const service = useSelectService();
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

  if (isItemLoading(item)) {
    return <OptionLoadingComponent />;
  }

  if (!item || !item.data) return null;

  return (
    <>
      {displayGroup && <OptionGroupComponent {...props} />}
      <div
        className={classNames}
        onMouseEnter={() => hoverable && onMouseEnter && item && onMouseEnter(item, index)}
        onMouseLeave={() => hoverable && onMouseLeave && item && onMouseLeave(item, index)}
        onClick={() => clickable && onClick && item && onClick(item, index)}
      >
        {/* {multiple && <div className="o-select-option-icon">{meta?.selected? <>&#10003;</>:<></>}</div> } */}
        {multiple && (
          <Checkbox
            value={item?.selected ? true : false}
            onChange={() => clickable && onClick && item && onClick(item, index)}
            color="currentColor"
            className="o-select-option-multiple-checkbox"
          ></Checkbox>
        )}
        <OptionContentComponent {...props} />
      </div>
    </>
  );
});

SelectOptionComponent.displayName = 'SelectOptionComponent';

export default SelectOptionComponent;

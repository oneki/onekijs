import { LoadingStatus } from 'onekijs-framework';
import React, { FC, useMemo } from 'react';
import Checkbox from '../../checkbox';
import { SelectOptionProps } from '../typings';

export const MultiSelectOptionComponent: FC<SelectOptionProps> = React.memo((props) => {
  return <SelectOptionComponent {...props} multiple={true} />;
});

MultiSelectOptionComponent.displayName = 'MultiSelectOptionComponent';

const SelectOptionComponent: FC<SelectOptionProps> = React.memo(
  ({ item, index, onClick, onMouseOver, onMouseEnter, onMouseLeave, onMouseOut, multiple = false }) => {
    let content = '';
    let clickable = !!onClick;
    let hoverable = true;
    if (item?.data === undefined && item?.loadingStatus === LoadingStatus.Loading) {
      content = 'loading';
      clickable = false;
      hoverable = false;
    } else {
      content = item?.text || '';
    }

    const classNames = useMemo(() => {
      const classNames = ['o-select-option'];
      if (clickable) {
        classNames.push('o-select-option-clickable');
      }
      if (hoverable && item?.highlighted) {
        classNames.push('o-select-option-highlighted');
      }
      if (item?.selected) {
        classNames.push('o-select-option-selected');
      }
      return classNames.join(' ');
    }, [item, clickable, hoverable]);

    return (
      <div
        className={classNames}
        onMouseOver={() => hoverable && onMouseOver && onMouseOver(item, index)}
        onMouseEnter={() => hoverable && onMouseEnter && onMouseEnter(item, index)}
        onMouseLeave={() => hoverable && onMouseLeave && onMouseLeave(item, index)}
        onMouseOut={() => hoverable && onMouseOut && onMouseOut(item, index)}
        onClick={() => clickable && onClick && onClick(item, index)}
      >
        {/* {multiple && <div className="o-select-option-icon">{meta?.selected? <>&#10003;</>:<></>}</div> } */}
        {multiple && (
          <Checkbox
            value={item?.selected ? true : false}
            onChange={() => undefined}
            color={item?.highlighted ? 'white' : undefined}
          ></Checkbox>
        )}
        <div className="o-select-option-data">
          {item?.data === undefined && item?.loadingStatus === LoadingStatus.Loading ? 'loading' : content}
        </div>
      </div>
    );
  },
);

SelectOptionComponent.displayName = 'SelectOptionComponent';

export default SelectOptionComponent;

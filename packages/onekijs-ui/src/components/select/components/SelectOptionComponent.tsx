import Checkbox from '../../checkbox';
import { LoadingStatus } from 'onekijs-core';
import React, { FC, useMemo } from 'react';
import { SelectOptionProps } from '../typings';

export const MultiSelectOptionComponent: FC<SelectOptionProps> = React.memo((props) => {
  return <SelectOptionComponent {...props} multiple={true} />
});

const SelectOptionComponent: FC<SelectOptionProps> = React.memo(({ item, index, onClick, onMouseOver, onMouseEnter, onMouseLeave, onMouseOut, multiple = false }) => {
  const { data, text, meta } = item;
  let content = '';
  let clickable = !!onClick;
  let hoverable = true;
  if (data === undefined && meta?.loadingStatus === LoadingStatus.Loading) {
    content = 'loading';
    clickable = false;
    hoverable = false;
  } else {
    content = text || '';
  }

  const classNames = useMemo(() => {
    const classNames = ['o-select-option'];
    if (clickable) {
      classNames.push('o-select-option-clickable');
    }
    if (hoverable && meta?.highlighted) {
      classNames.push('o-select-option-highlighted');
    }
    if (meta?.selected) {
      classNames.push('o-select-option-selected');
    }    
    return classNames.join(' ');
  }, [meta, clickable, hoverable]);

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
      {multiple && <Checkbox checked={meta?.selected ? true : false} onChange={() => {}} color={meta?.highlighted ? 'white' : undefined}></Checkbox> }
      <div 
        className="o-select-option-data"   
      >
        {data === undefined && meta?.loadingStatus === LoadingStatus.Loading ? 'loading' : content}
      </div>
      
    </div>
  );
});

SelectOptionComponent.displayName = 'SelectOptionComponent';

export default SelectOptionComponent;

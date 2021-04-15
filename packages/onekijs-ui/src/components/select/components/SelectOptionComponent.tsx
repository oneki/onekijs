import React, { FC, useMemo } from 'react';
import { SelectOptionProps } from '../typings';
import { LoadingStatus } from 'onekijs-core';

const SelectOptionComponent: FC<SelectOptionProps> = React.memo(({ item, index, onClick, onMouseOver }) => {
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
    if (hoverable && !meta?.selected) {
      classNames.push('o-select-option-hoverable');
    }
    if (meta?.selected) {
      classNames.push('o-select-option-selected');
    }    
    return classNames.join(' ');
  }, [clickable, hoverable]);

  return (
    <div
      className={classNames}
      onClick={() => clickable && onClick && onClick(item, index)}
      onMouseOver={() => hoverable && onMouseOver && onMouseOver(item, index)}
    >
      {data === undefined && meta?.loadingStatus === LoadingStatus.Loading ? 'loading' : content}
    </div>
  );
});

SelectOptionComponent.displayName = 'SelectOptionComponent';

export default SelectOptionComponent;

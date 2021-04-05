import React, { FC, useMemo } from 'react';
import { SelectOptionProps } from '../typings';
import { LoadingStatus } from 'onekijs-core';

const SelectOptionComponent: FC<SelectOptionProps> = React.memo(({ item, index, onClick, onMouseOver }) => {
  const { data, text, meta } = item;
  let content = '';
  let clickable = !!onClick;
  let hoverable = !!onMouseOver;
  if (data === undefined && meta?.loadingStatus === LoadingStatus.Loading) {
    content = 'loading';
    clickable = false;
    hoverable = false;
  } else {
    content = text || '';
    if (meta?.selected) {
      content += ' *';
    }
  }
  const classNames = useMemo(() => {
    const classNames = ['o-select-option'];
    if (clickable) {
      classNames.push('o-select-option-clickable');
    }
    if (hoverable) {
      classNames.push('o-select-option-hoverable');
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

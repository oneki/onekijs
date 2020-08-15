import React, { FC } from 'react';
import { SelectOptionProps } from '../typings';

const SelectOptionComponent: FC<SelectOptionProps> = React.memo(({ item, text, loading }) => {
  return <div className="o-select-option">{item === undefined && loading ? 'loading' : text}</div>;
});

SelectOptionComponent.displayName = 'SelectOptionComponent';

export default SelectOptionComponent;

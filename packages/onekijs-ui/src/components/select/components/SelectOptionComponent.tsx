import React, { FC } from 'react';
import { SelectOptionProps } from '../typings';
import { LoadingStatus } from '../../../lib/typings';

const SelectOptionComponent: FC<SelectOptionProps> = React.memo(({ data, text, meta }) => {
  return (
    <div className="o-select-option">
      {data === undefined && meta?.loadingStatus === LoadingStatus.Loading ? 'loading' : text}
    </div>
  );
});

SelectOptionComponent.displayName = 'SelectOptionComponent';

export default SelectOptionComponent;

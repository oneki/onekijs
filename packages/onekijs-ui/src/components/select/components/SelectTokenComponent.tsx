import React from 'react';
import { SelectItem, SelectTokenProps } from '../typings';

const SelectTokenComponent = <T, I extends SelectItem<T> = SelectItem<T>>({
  token,
  onRemove,
  index,
}: SelectTokenProps<T, I>) => {
  return (
    <div className={`o-select-token${token.disabled ? ' o-select-token-disabled': ''}`}>
      <div className="o-select-token-text" key="o-select-token-text">
        {token.text}
      </div>
      {!token.disabled && <div
        className="o-select-token-remove"
        key="o-select-token-remove"
        onClick={(e) => {
          onRemove(token, index);
          e.stopPropagation();
        }}
      >
        &#10006;
      </div>}
    </div>
  );
};

SelectTokenComponent.displayName = 'SelectTokenComponent';

export default React.memo(SelectTokenComponent) as typeof SelectTokenComponent;

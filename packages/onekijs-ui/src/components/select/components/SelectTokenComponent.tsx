import React, { FC } from 'react';
import { SelectTokenProps } from '../typings';

const SelectTokenComponent: FC<SelectTokenProps> = React.memo(({ token, onRemove, index }) => {

  return (

    <div className="o-select-token">
        <div className="o-select-token-text" key="o-select-token-text">{token.text}</div>
        <div className="o-select-token-remove" key="o-select-token-remove" onClick={() => {onRemove(token, index)}}>&#10006;</div>
    </div>

  )
});

export default SelectTokenComponent;

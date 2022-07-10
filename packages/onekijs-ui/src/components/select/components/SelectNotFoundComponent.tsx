import React from 'react';
import CloseAllIcon from '../../icon/CloseAllIcon';
import { SelectNotFoundProps } from '../typings';

const SelectNotFoundComponent: React.FC<SelectNotFoundProps> = ({ text = 'No data' }) => {
  return (
    <div className="o-select-not-found">
      <CloseAllIcon width="32px" height="32px" />
      <span>{text}</span>
    </div>
  );
};

export default SelectNotFoundComponent;

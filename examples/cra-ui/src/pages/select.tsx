import React from 'react';
import { Select } from 'onekijs-ui';

export const SelectPage = () => {
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div style={{width: '300px'}}>
        <Select placeholder="Search by position">toto</Select>
      </div>
    </div>
  );
};

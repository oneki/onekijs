import React from 'react';
import { Select, useCollection } from 'onekijs-ui';
import { users } from '../data/users';

export const SelectPage = () => {
  const collection = useCollection(users);
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div style={{width: '300px'}}>
        <Select placeholder="Search by position" data={collection} />
      </div>
    </div>
  );
};

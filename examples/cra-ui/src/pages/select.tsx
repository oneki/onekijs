import React from 'react';
import { Select, useCollection } from 'onekijs-ui';
import { users, userAdapter, userSearcher } from '../data/users';

export const SelectPage = () => {
  const collection = useCollection(users, {
    searcher: userSearcher,
    adapter: userAdapter,
  });
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div style={{width: '300px'}}>
        <Select placeholder="Search by position" items={collection} value={users[1]} />
      </div>
    </div>
  );
};

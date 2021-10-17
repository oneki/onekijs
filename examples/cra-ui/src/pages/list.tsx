import React from 'react';
import { users, userAdapter } from '../data/users';
import { useCollection } from 'onekijs';
import { List } from 'onekijs-ui';

export const ListPage = () => {
  const collection = useCollection(users, {
    adapter: userAdapter
  });
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div style={{width: '300px'}}>
        <List height={200} items={collection} />
      </div>
    </div>
  );
};

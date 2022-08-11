import { List, useListController } from 'onekijs-ui';
import React from 'react';
import { userAdapter, users } from '../data/users';

export const ListPage = () => {
  const collection = useListController(users, {
    adapter: userAdapter,
  });
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '300px' }}>
        <List height={200} controller={collection} />
      </div>
    </div>
  );
};

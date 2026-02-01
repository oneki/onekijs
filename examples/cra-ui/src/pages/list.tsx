import { List, useListController } from 'onekijs-ui';
import React, { useRef } from 'react';
import { User, userAdapter, users } from '../data/users';

export const ListPage = () => {
  const collection = useListController<User>(users, {
    adapter: userAdapter,
  });
  const ref = useRef<HTMLDivElement | null>(null);
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', overflow: 'scroll' }} ref={ref}>
      <div style={{ width: '300px' }}>
        <List height={200} controller={collection} parentRef={ref} />
      </div>
    </div>
  );
};

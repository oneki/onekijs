import React, { useCallback, useState } from 'react';
import { useCollection, CollectionState, LocalCollectionService, toCollectionItem, Query } from 'onekijs';
import { users, userAdapter, userSearcher, User } from '../data/users';
import { useService, Fetcher } from 'onekijs';
import { Select, SelectOptionMeta } from 'onekijs-ui';

export const SelectPage = () => {
  const [, service] = useService<CollectionState<User, SelectOptionMeta>, LocalCollectionService<User, SelectOptionMeta, CollectionState<User, SelectOptionMeta>>>(LocalCollectionService, {
    db: users.map(u => toCollectionItem(u)),
    adapter: userAdapter, 
    searcher: userSearcher
  } as CollectionState<User, SelectOptionMeta>)

  const fetcher: Fetcher = useCallback(
    async (url, method, body, options) => {
      await new Promise((r) => setTimeout(r, 1000 + Math.floor(Math.random() * Math.floor(300))));
      const query = body as Query;
      if (service.getSearch() !== body.search) {
        query.search = body.search || '';
        query.offset = 0;
      }
      service.query(query);
      const items = service.items ? service.items.slice(query.offset || 0, (query.offset || 0) + (query.limit || service.items.length)).map(item => item?.data) : [];
      
      return {
        'data': items,
        'total': service.items ? service.items.length : 0,
      };
    },
    [service],
  );

  const collection = useCollection<User, SelectOptionMeta>('http://localhost', {
    adapter: userAdapter,
    fetcher 
  });

  const [value, setValue] = useState(users[1]);

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div style={{width: '300px'}}>
        <Select placeholder="Search by position" items={collection} value={value} onChange={(nextValue: User) => setValue(nextValue)}  />
      </div>
    </div>
  );
};

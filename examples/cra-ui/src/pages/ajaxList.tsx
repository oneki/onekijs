import { Fetcher, HttpMethod, useService } from 'onekijs';
import { List, LocalQueryService, LocalQueryState, Query, useRestCollection, QuerySearcher } from 'onekijs-ui';
import React, { useCallback } from 'react';
import { users, User } from '../data/users';

const adapter = (item: User) => {
  return {
    id: item.id,
    text: `${item.firstname} ${item.lastname}`,
    loading: false,
  };
};

const searcher: QuerySearcher<User> = (item, search) => {
  if (search) {
    return `${item.firstname} ${item.lastname}`.toUpperCase().includes(String(search).toUpperCase());
  }
  return true;
}

export const AjaxListPage = () => {
  const [, service] = useService(LocalQueryService, { data: users, searcher } as LocalQueryState);

  const fetcher: Fetcher = useCallback(
    async (url, method, body, options) => {
      await new Promise((r) => setTimeout(r, 1000 + Math.floor(Math.random() * Math.floor(100))));
      service.query(body as Query);
      return service.paginatedData;
    },
    [service],
  );

  const collection = useRestCollection('http://localhost', {
    fetcher,
    method: HttpMethod.Post,
  });
  
  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    collection.search(e.target.value);
  }
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
      <input type="text" onChange={search} style={{ width: '300px', marginTop:'40px' }} />
      <div style={{ width: '300px', border:'1px solid black', padding: '5px' }}>
        <List height={200} data={collection} adapter={adapter} preload={100} increment={100} />
      </div>
      
      
    </div>
  );
};

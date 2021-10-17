import {
  Collection, CollectionService, CollectionState,
  Fetcher,
  HttpMethod,
  ItemMeta,
  LoadingStatus, Query, useCollection,
  useService
} from 'onekijs';
import {
  List
} from 'onekijs-ui';
import React, { useCallback } from 'react';
import { User, userAdapter, users, userSearcher } from '../data/users';
import Spinner from './spinner';



const isLoading = (collection: Collection<User, ItemMeta>): boolean => {
  return collection.status === LoadingStatus.Loading || collection.status === LoadingStatus.PartialLoading;
};

export const AjaxListPage = () => {
  const [, service] = useService<
    CollectionState<User, ItemMeta>,
    CollectionService<User, ItemMeta, CollectionState<User, ItemMeta>>
  >(CollectionService, {
    dataSource: users,
    adapter: userAdapter,
    searcher: userSearcher,
  } as CollectionState<User, ItemMeta>);

  const fetcher: Fetcher = useCallback(
    async (url, method, body, options) => {
      await new Promise((r) => setTimeout(r, 1000 + Math.floor(Math.random() * Math.floor(300))));
      service.query(body as Query);
      return service.items
        ? service.items
            .slice(body.offset || 0, (body.offset || 0) + (body.size || service.items.length))
            .map((item) => item?.data)
        : [];
    },
    [service],
  );

  const remoteCollection = useCollection<User>('http://localhost', {
    adapter: userAdapter,
    fetcher,
    method: HttpMethod.Post,
    delayLoading: 200,
  });

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    remoteCollection.search(e.target.value);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'left',
          flexDirection: 'row',
          width: '300px',
          marginTop: '40px',
          marginBottom: '5px',
        }}
      >
        <input type="text" onChange={search} style={{ width: '250px', marginRight: '5px' }} />
        {isLoading(remoteCollection) && <Spinner />}
      </div>
      <div style={{ width: '300px', border: '1px solid black', padding: '5px' }}>
        <List height={200} items={remoteCollection} preload={100} increment={100} />
      </div>
    </div>
  );
};

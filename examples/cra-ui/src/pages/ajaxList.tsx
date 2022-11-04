import {
  Collection,
  CollectionService,
  CollectionState,
  Fetcher,
  HttpMethod,
  Item,
  LoadingStatus,
  Query,
  useService,
} from 'onekijs';
import { List, useListController } from 'onekijs-ui';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { User, userAdapter, users, userSearcher } from '../data/users';
import Spinner from './spinner';

const isLoading = (collection: Collection<User, Item<User>>): boolean => {
  return collection.status === LoadingStatus.Loading || collection.status === LoadingStatus.PartialLoading;
};

const AjaxList = styled(List)`
.o-list-item-highlighted {
  background: yellow
}
.o-list-item-active {
  background: blue
}
.o-list-item-selected {
  background: red
}
` as typeof List;

export const AjaxListPage = () => {
  const [, service] = useService<
    CollectionState<User, Item<User>>,
    CollectionService<User, Item<User>, CollectionState<User, Item<User>>>
  >(CollectionService, {
    dataSource: users,
    adapter: userAdapter,
    searcher: userSearcher,
  } as CollectionState<User, Item<User>>);

  const fetcher: Fetcher = useCallback(
    async (url, method, body: any, options) => {
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

  const remoteCollection = useListController<User>('http://localhost', {
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
        <AjaxList height={200} controller={remoteCollection} preload={100} increment={100} keyboardNavigable={true} />
      </div>
    </div>
  );
};

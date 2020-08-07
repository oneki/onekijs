import { List, useCollection, useRestCollection } from 'onekijs-ui';
import React from 'react';
import { users } from '../data/users';
import { Fetcher, HttpMethod } from 'onekijs';

const adapter = (item: any) => {
  return {
    id: item.id,
    text: `${item.firstname} ${item.lastname}`,
    loading: false,
  };
};

const fetcher: Fetcher = async(url, method, body, options) => {
  await new Promise(r => setTimeout(r, Math.floor(Math.random() * Math.floor(500))));
  const offset = body.offset || 0;
  const size = body.size || users.length;
  return users.slice(offset, offset + size);
}

export const AjaxListPage = () => {
  const collection = useRestCollection('http://localhost', {
    fetcher,
    method: HttpMethod.Post,
  })
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '300px' }}>
        <List height={200} data={collection} adapter={adapter} preload={100} increment={100} />
      </div>
    </div>
  );
};

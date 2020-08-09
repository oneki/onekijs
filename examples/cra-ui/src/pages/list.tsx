import React from 'react';
import { List, useCollection } from 'onekijs-ui';
import { users } from '../data/users';

const adapter = (item: any) => {
  return {
    id: item.id,
    text: `${item.firstname} ${item.lastname}`,
    loading: false,
  }
}

export const ListPage = () => {
  const collection = useCollection(users);
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div style={{width: '300px'}}>
        <List height={200} data={collection} adapter={adapter} />
      </div>
    </div>
  );
};

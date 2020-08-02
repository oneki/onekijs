import React from 'react';
import { List } from 'onekijs-ui';

export const ListPage = () => {
  const items = new Array(10000)
    .fill(true)
    .map((_n, index) => ({
      id: index, 
      text: `Item ${25 + Math.round(Math.random() * 100)}`,
    }));
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div style={{width: '300px'}}>
        <List height={200} items={items}>toto</List>
      </div>
    </div>
  );
};

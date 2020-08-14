import React from 'react';
import { Select, useCollection } from 'onekijs-ui';
import { users, userAdapter } from '../data/users';

export const SelectPage = () => {
  const collection = useCollection(users, {
    searcher: (user, search) => {
      if (search) {
        return `${user.firstname} ${user.lastname}`.toUpperCase().startsWith(String(search).toUpperCase());
      }
      return true;
    }
  });
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div style={{width: '300px'}}>
        <Select placeholder="Search by position" data={collection} adapter={userAdapter} value={users[1]} />
      </div>
    </div>
  );
};

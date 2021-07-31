import { useGrid } from 'onekijs-ui';

import React from 'react';
import { users } from '../data/users';

export const GridPage = () => {
  const {Grid } = useGrid(users, [
    {
      id: 'id',
      minWidth: '50px',
      maxWidth: '50px',
      title: 'ID',
    },
    {
      id: 'firstname',
      width: '10px',
      title: 'Firstname',
    },
    {
      id: 'lastname',
      width: '20px',
      title: 'Lastname',
    },
    {
      id: 'address.street',
      width: '600px',
      title: 'Street',
    },
    {
      id: 'address.postalCode',
      title: 'Postal Code',
    },
    {
      id: 'address.city',
      title: 'City',
    },
  ], {
    //grow: 'address.city'
  });

  return <Grid />;
};

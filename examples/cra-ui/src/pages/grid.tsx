import { useGrid } from 'onekijs-ui';

import React from 'react';
import { users } from '../data/users';

export const GridPage = () => {
  const {Grid } = useGrid(users, [
    {
      id: 'id',
    },
    {
      id: 'firstname',
    },
    {
      id: 'lastname',
    },
    {
      id: 'address.street',
    },
    {
      id: 'address.postalCode',
    },
    {
      id: 'address.city',
    },
  ]);

  return <Grid />;
};

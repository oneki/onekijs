
import { Grid, useGrid } from 'onekijs-ui';

import React from "react";
import { users } from '../data/users';

export const GridPage = () => {
  const controller = useGrid({
    columns: [{
      id: 'id',
    }, {
      id: 'firstname',
    }, {
      id: 'firstname',
    }, {
      id: 'address.street',
    }, {
      id: 'address.postalCode',
    }, {
      id: 'address.city',
    }],
    items: users
  })

  return <Grid controller={controller} />
};


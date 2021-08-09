import { ComponentStyle, preflight, useGrid, Grid, GridBodyCellProps, Input2 as Input, GridItemMeta } from 'onekijs';

import React from 'react';
import styled, { css } from 'styled-components';
import { User, users } from '../data/users';

const gridStyle: ComponentStyle<{}> = () => {
  return css``;
};

const FirstnameInput: React.FC<GridBodyCellProps<User, GridItemMeta>> = ({ rowValue }) => {
  return <Input name="firstname" value={rowValue.data?.firstname} />
}

const Page: React.FC<{ className?: string }> = ({ className }) => {
  const controller = useGrid({
    dataSource: users,
    columns: [
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
        CellComponent: FirstnameInput,

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
    ],
    mutateUrl: true,
    //grow: 'address.city'
  });

  return <Grid controller={controller} className={className} />;
};

export const GridPage = styled(Page)`
  ${gridStyle}
`;

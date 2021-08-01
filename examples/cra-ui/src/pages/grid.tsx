import { ComponentStyle, fontFamily, preflight, useGrid } from 'onekijs-ui';

import React from 'react';
import styled, { css } from 'styled-components';
import { users } from '../data/users';

const gridStyle: ComponentStyle<{}> = () => {
  return css`
      ${preflight()}
    `;
};

const Page: React.FC<{className?: string}> = ({ className }) => {
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
    className
  });

  return <Grid  />;
};

export const GridPage = styled(Page)`
  ${gridStyle}
`;

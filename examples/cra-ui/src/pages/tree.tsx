import { ComponentStyle, Tree, useTreeController } from 'onekijs-ui';
import React from 'react';
import styled, { css } from 'styled-components';
import { User, userAdapter } from '../data/users';

const tableStyle: ComponentStyle<{}> = () => {
  return css``;
};

const u: User[] = [
  {
    id: 0,
    firstname: 'Burnett',
    lastname: 'Casey',
    address: {
      street: 'Christopher Avenue',
      postalCode: 4362,
      city: 'Sugartown',
    },
    phones: ['+32 (858) 444-3294', '+32 (901) 522-2326'],
    children: [
      {
        id: 4,
        firstname: 'Lilly',
        lastname: 'Flowers',
        address: {
          street: 'Garfield Place',
          postalCode: 3293,
          city: 'Saddlebrooke',
        },
        phones: [],
      },
      {
        id: 5,
        firstname: 'Katherine',
        lastname: 'Valenzuela',
        address: {
          street: 'Vernon Avenue',
          postalCode: 3898,
          city: 'Loyalhanna',
        },
        phones: ['+32 (985) 581-3617', '+32 (829) 517-3196', '+32 (847) 549-2820'],
        children: [
          {
            id: 9,
            firstname: 'Lowery',
            lastname: 'Sears',
            address: {
              street: 'Dupont Street',
              postalCode: 1238,
              city: 'Bedias',
            },
            phones: [],
          },
          {
            id: 10,
            firstname: 'Kaufman',
            lastname: 'Weaver',
            address: {
              street: 'Clark Street',
              postalCode: 2992,
              city: 'Salunga',
            },
            phones: [],
          },
        ],
      },
      {
        id: 6,
        firstname: 'Weeks',
        lastname: 'Tran',
        address: {
          street: 'Billings Place',
          postalCode: 4431,
          city: 'Grayhawk',
        },
        phones: [],
      },
    ],
  },
  {
    id: 1,
    firstname: 'Alyce',
    lastname: 'Warren',
    address: {
      street: 'Abbey Court',
      postalCode: 4517,
      city: 'Zortman',
    },
    phones: ['+32 (941) 540-2562', '+32 (804) 558-2088', '+32 (844) 418-3245'],
  },
  {
    id: 2,
    firstname: 'Hale',
    lastname: 'Stuart',
    address: {
      street: 'Fillmore Avenue',
      postalCode: 2166,
      city: 'Winston',
    },
    phones: [],
  },
  {
    id: 3,
    firstname: 'Wilda',
    lastname: 'Barber',
    address: {
      street: 'Bergen Court',
      postalCode: 3789,
      city: 'Johnsonburg',
    },
    phones: ['+32 (845) 549-3039'],
  },
];

const Page: React.FC<{ className?: string }> = ({ className }) => {
  const controller = useTreeController(u, {
    adapter: userAdapter
  });

  return <Tree controller={controller} />;
};

export const TreePage = styled(Page)`
  ${tableStyle}
`;

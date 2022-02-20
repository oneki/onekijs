import { ComponentStyle, Tree, useTreeController } from 'onekijs-ui';
import React from 'react';
import styled, { css } from 'styled-components';
import { generateTree, User, userAdapter } from '../data/users';

const tableStyle: ComponentStyle<{}> = () => {
  return css``;
};

const u: User[] = generateTree();

const Page: React.FC<{ className?: string }> = ({ className }) => {
  const controller = useTreeController(u, {
    adapter: userAdapter
  });

  return <Tree controller={controller} />;
};

export const TreePage = styled(Page)`
  ${tableStyle}
`;

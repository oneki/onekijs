import { useGlobalState } from 'onekijs-framework';
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
    adapter: userAdapter,
  });

  const [debug, setDebug] = useGlobalState<boolean>('debug');

  const toggleDebug = () => {
    setDebug(!debug);
  }

  return (
    <>
      <button onClick={toggleDebug}>{debug ? 'Disable Debug' : 'Activate Debug'}</button>
      <Tree controller={controller} />
    </>
  );
};

export const TreePage = styled(Page)`
  ${tableStyle}
`;

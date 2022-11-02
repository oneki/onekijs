import { LogLevel, useGlobalState } from 'onekijs-framework';
import { ComponentStyle, Tree, useTreeController } from 'onekijs-ui';
import React from 'react';
import styled, { css } from 'styled-components';
import { generateTree, User, userAdapter } from '../data/users';

const treeStyle: ComponentStyle<{}> = () => {
  return css``;
};

const u: User[] = generateTree();

const Page: React.FC<{ className?: string }> = ({ className }) => {
  const controller = useTreeController(u, {
    adapter: userAdapter,
  });

  const [logLevel, setLogLevel] = useGlobalState<LogLevel | undefined>('logLevel');

  const toggleDebug = () => {
    if (logLevel) {
      setLogLevel(undefined);
    } else {
      setLogLevel('debug');
    }

  }

  return (
    <>
      <button onClick={toggleDebug}>{logLevel ? 'Disable Debug' : 'Activate Debug'}</button>
      <Tree controller={controller} height={400} />
    </>
  );
};

export const TreePage = styled(Page)`
  ${treeStyle}
`;

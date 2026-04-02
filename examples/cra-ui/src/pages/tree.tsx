import { clone } from 'onekijs-framework';
import { ComponentStyle, Tree, useTreeController } from 'onekijs-ui';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { generateTree, User, userAdapter } from '../data/users';

const treeStyle: ComponentStyle<{}> = () => {
  return css``;
};

let data = generateTree();


const Page: React.FC<{ className?: string }> = ({ className }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const [move, setMove] = useState('');
  const [after, setAfter] = useState('');

  const controller = useTreeController(data, {
    adapter: userAdapter,
  });

  const rename = () => {
    const nextData = clone(data);  // important to clone because data are freezed when they are inserted in a tree
    const doRename = (user: User) => {
      if (`${user.firstname} ${user.lastname}` === from) {
        user.firstname = to.split(' ')[0];
        user.lastname = to.split(' ')[1];
      }
      for (const child of (user.children ?? [])) {
        doRename(child);
      }
    }
    for (const user of nextData) {
      doRename(user);
    }
    data = nextData;
    controller.setData(nextData);
  };

  const findUser = (data: User[], name: string) => {
    const doFind = (user: User): User | undefined => {
      if (`${user.firstname} ${user.lastname}` === name) {
        return user;
      }
      for (const child of (user.children ?? [])) {
        const result = doFind(child);
        if (result !== undefined) return result;
      }
    }
    for (const user of data) {
      const result = doFind(user);
      if (result !== undefined) return result;
    }
  }

  const moveAfter = () => {
    const nextData = clone(data);  // important to clone because data are freezed when they are inserted in a tree
    const toMove = findUser(nextData, move);
    const afterUser = findUser(nextData, after);
    console.log(toMove, afterUser);
    if (!toMove || !afterUser) return;

    const visit = (users: User[]) => {
      const result: User[] = [];
      for (const user of users) {
        if (user.id !== toMove.id) {
          result.push(user);
          if (Array.isArray(user.children)) {
            user.children = visit(user.children);
          }
        }
        if (user.id === afterUser.id) {
          result.push(toMove);
        }
      }
      return result;
    }
    data = visit(nextData);
    console.log(data);
    controller.setData(data);
  };

  return (
    <>
      <div>
        <input style={{border: '1px solid black'}} value={from} onChange={(e) => setFrom(e.target.value)} placeholder='from' />{' '}
        <input style={{border: '1px solid black'}} value={to} onChange={(e) => setTo(e.target.value)} placeholder='to' />
        <button onClick={rename}>Rename</button>
      </div>
      <div>
        <input style={{border: '1px solid black'}} value={move} onChange={(e) => setMove(e.target.value)} placeholder='move' />{' '}
        <input style={{border: '1px solid black'}} value={after} onChange={(e) => setAfter(e.target.value)} placeholder='after' />
        <button onClick={moveAfter}>Move</button>
      </div>
      <Tree controller={controller} height={400} />
    </>
  );
};

export const TreePage = styled(Page)`
  ${treeStyle}
`;

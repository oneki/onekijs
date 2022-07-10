import { Button, DropdownComponent2, DropdownContent, DropdownTrigger, List, useListController } from 'onekijs-ui';
import { useState } from 'react';
import { userAdapter, users } from '../data/users';

export const ButtonPage = () => {
  // const collection = useListController(users, {
  //   adapter: userAdapter,
  // });
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button kind="primary">Primary</Button> <Button kind="danger">Danger</Button>{' '}
      <Button kind="warning">Warning</Button> <Button kind="success">Success</Button>{' '}
      <Button kind="secondary">Secondary</Button> <Button kind="light">Light</Button>{' '}
      <DropdownComponent2 open={open} placement="bottom">
        <DropdownTrigger>
          <div onClick={() => setOpen(!open)}>Primary</div>
        </DropdownTrigger>
        <DropdownContent>
          <List dataSource={["a", "b"]} />
        </DropdownContent>
      </DropdownComponent2>
    </>
  );
};

import { Button, DropdownButton } from 'onekijs-ui';

export const ButtonPage = () => {
  // const collection = useListController(users, {
  //   adapter: userAdapter,
  // });
  return (
    <>
      <Button kind="primary">Primary</Button> <Button kind="danger">Danger</Button>{' '}
      <Button kind="warning">Warning</Button> <Button kind="success">Success</Button>{' '}
      <Button kind="secondary">Secondary</Button> <Button kind="light">Light</Button>{' '}
      <DropdownButton dataSource={["a", "b"]}>Dropdown</DropdownButton>
    </>
  );
};

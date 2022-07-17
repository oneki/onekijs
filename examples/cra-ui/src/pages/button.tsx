import { Button, DropdownButton } from 'onekijs-ui';

export const ButtonPage = () => {
  // const collection = useListController(users, {
  //   adapter: userAdapter,
  // });
  return (
    <>
      <Button kind="primary">Primary</Button> <Button kind="info">Info</Button> <Button kind="danger">Danger</Button>{' '}
      <Button kind="warning">Warning</Button> <Button kind="success">Success</Button>{' '}
      <Button kind="secondary">Secondary</Button> <Button kind="light">Light</Button>{' '}
      <DropdownButton dataSource={["a", "b"]}>Dropdown</DropdownButton><br />
      <Button kind="primary" disabled>Primary</Button> <Button kind="info" disabled>Info</Button> <Button kind="danger" disabled>Danger</Button>{' '}
      <Button kind="warning" disabled>Warning</Button> <Button kind="success" disabled>Success</Button>{' '}
      <Button kind="secondary" disabled>Secondary</Button> <Button kind="light" disabled>Light</Button>{' '}<br />
      <Button kind="primary" pattern="outline">Primary</Button> <Button kind="info" pattern="outline">Info</Button> <Button kind="danger" pattern="outline">Danger</Button>{' '}
      <Button kind="warning" pattern="outline">Warning</Button> <Button kind="success" pattern="outline">Success</Button>{' '}
      <Button kind="secondary" pattern="outline">Secondary</Button> <Button kind="light" pattern="outline">Light</Button>
      <br />
      <Button kind="primary" pattern="flat">Primary</Button> <Button kind="info" pattern="flat">Info</Button> <Button kind="danger" pattern="flat">Danger</Button>{' '}
      <Button kind="warning" pattern="flat">Warning</Button> <Button kind="success" pattern="flat">Success</Button>{' '}
      <Button kind="secondary" pattern="flat">Secondary</Button> <Button kind="black" pattern="flat">Black</Button>
    </>
  );
};

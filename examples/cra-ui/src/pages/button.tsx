import { Button, ColorPropertyTheme, DropdownButton, SearchIcon } from 'onekijs-ui';

const colors: ColorPropertyTheme[] = [
  'white',
  'lightest',
  'lighter',
  'light',
  'dark',
  'darker',
  'darkest',
  'black',
  'success',
  'info',
  'warning',
  'danger',
  'primary',
  'secondary',
  'blue',
  'red',
  'purple',
  'pink',
  'indigo',
  'teal',
  'orange',
  'yellow',
  'green',
  'lightblue',
  'lightred',
  'lightpurple',
  'lightpink',
  'lightindigo',
  'lightteal',
  'lightorange',
  'lightyellow',
  'lightgreen',
];

export const ButtonPage = () => {
  // const collection = useListController(users, {
  //   adapter: userAdapter,
  // });
  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        {colors.map((c: ColorPropertyTheme) => (
          <>
            <Button kind={c}>{c}</Button>{' '}
          </>
        ))}
      </div>
      <br />
      <div style={{ marginBottom: '10px' }}>
        {colors.map((c: ColorPropertyTheme) => (
          <>
            <Button IconComponent={() => <SearchIcon width="16px" />} kind={c}>
              {c}
            </Button>{' '}
          </>
        ))}
      </div>
      <br />
      <div style={{ marginBottom: '10px' }}>
        {colors.map((c: ColorPropertyTheme) => (
          <>
            <DropdownButton kind={c} dataSource={['a', 'b']}>Dropdown</DropdownButton>{' '}
          </>
        ))}
      </div>

      <br />
      <div style={{ marginBottom: '10px' }}>
        {colors.map((c: ColorPropertyTheme) => (
          <>
            <Button kind={c} disabled>
              {c}
            </Button>{' '}
          </>
        ))}
      </div>
      <br />
      <div style={{ marginBottom: '10px' }}>
        {colors.map((c: ColorPropertyTheme) => (
          <>
            <Button kind={c} pattern="outline">
              {c}
            </Button>{' '}
          </>
        ))}
      </div>
      <br />
      <div style={{ marginBottom: '10px' }}>
        {colors.map((c: ColorPropertyTheme) => (
          <>
            <Button kind={c} disabled pattern="outline">
              {c}
            </Button>{' '}
          </>
        ))}
      </div>
      <br />
      <div style={{ marginBottom: '10px' }}>
        {colors.map((c: ColorPropertyTheme) => (
          <>
            <Button kind={c} pattern="flat">
              {c}
            </Button>{' '}
          </>
        ))}
      </div>
      <br />
      <div style={{ marginBottom: '10px' }}>
        {colors.map((c: ColorPropertyTheme) => (
          <>
            <Button kind={c} disabled pattern="flat">
              {c}
            </Button>{' '}
          </>
        ))}
      </div>
      <br />
    </>
  );
};

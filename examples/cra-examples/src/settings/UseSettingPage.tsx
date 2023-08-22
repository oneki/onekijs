import { useSetting } from 'onekijs';
import { FC } from 'react';

const UseSettingPage: FC = () => {
  const foo = useSetting<string>('foo');
  return (
    <div>
      Value of "foo" coming from settings is: <b>{foo}</b>
    </div>
  );
}

export default UseSettingPage;
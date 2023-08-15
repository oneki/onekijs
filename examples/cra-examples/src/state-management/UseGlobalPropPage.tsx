import { Link, useGlobalProp } from "onekijs";
import { FC } from "react";
import { FOO_KEY } from './UseGlobalStatePage';

const UseGlobalPropPage: FC = () => {
  const foo = useGlobalProp<string>(FOO_KEY);

  return (
    <>
      {!foo && <div>The global state doesn't contain the key 'foo'. You can set it <Link href="/state-management/use-global-state">via this page</Link>.</div>}
      {foo && <div>Value in global state: {foo}</div>}
    </>
  );
};

export default UseGlobalPropPage;
import { useLocalService } from 'onekijs';
import { MyLocalService } from './@service/MyLocalService';
import { FC } from 'react';

let uid = 0;

const UseLocalServicePage: FC = () => {
  // instanciate a local service
  const [state, service] = useLocalService(MyLocalService, {
    foo: `foo-${uid}`,
  });

  return (
    <div>
      <button onClick={() => service.setFoo(`foo-${++uid}`)}>Update</button>
      <div>Value in global state: {state.foo}</div>
    </div>
  );
};

export default UseLocalServicePage;

import { useGlobalState } from "onekijs";
import { FC } from "react";

let uid = 0;
export const FOO_KEY = "foo";

const UseGlobalStatePage: FC = () => {
  const [foo, setFoo] = useGlobalState(FOO_KEY);

  return (
    <div>
      <div>
        {!foo && <span>No value yet in the global state. Click on the update button</span>}
        {foo && <span>Value in global state: {foo}</span>}
      </div>

      <button onClick={() => setFoo(`foo-${++uid}`)}>Update</button>
    </div>
  );
};

export default UseGlobalStatePage;
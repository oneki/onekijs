import React, { FC } from 'react';
import { UseRemoteCollectionOptions } from '../../typings';
import useRestCollection from '../../useRestCollection';
import { TestHandler, TestUser } from '../typings';

type UseRestCollectionProps<T> = {
  url: string;
  options?: UseRemoteCollectionOptions<T>;
  handler?: TestHandler;
};

const UseRestCollectionWidget: FC<UseRestCollectionProps<TestUser>> = ({ url, options, handler }) => {
  const collection = useRestCollection(url, options);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  let execute = () => {};
  if (handler) {
    execute = () => {
      handler.actions.forEach((action) => {
        (collection as any)[action.method](...action.args);
      });
    };
  }

  return (
    <>
      <div data-testid="result">{JSON.stringify(collection.data)}</div>
      {handler && <button data-testid={handler.name} onClick={execute}></button>}
    </>
  );
};

export default UseRestCollectionWidget;

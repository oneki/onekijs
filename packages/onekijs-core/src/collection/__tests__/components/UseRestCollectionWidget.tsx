import React, { FC } from 'react';
import { UseCollectionOptions, ItemMeta } from '../../typings';
import useCollection from '../../useCollection';
import { TestHandler, TestUser } from '../typings';
import { get } from '../../../core/utils/object';

type UseRestCollectionProps<T> = {
  url: string;
  options?: UseCollectionOptions<T, ItemMeta>;
  handler?: TestHandler;
  type: 'url' | 'query';
};

const UseRestCollectionWidget: FC<UseRestCollectionProps<TestUser>> = ({ url, options, handler, type }) => {
  const collection = useCollection(url, options);
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
      <div data-testid="result">{JSON.stringify(type === 'url' ? get(collection.items, '0.data') : collection)}</div>
      {handler && <button data-testid={handler.name} onClick={execute}></button>}
    </>
  );
};

export default UseRestCollectionWidget;

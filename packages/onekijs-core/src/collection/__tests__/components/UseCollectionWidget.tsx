import React, { FC } from 'react';
import { UseCollectionOptions, ItemMeta, Item } from '../../typings';
import useCollection from '../../useCollection';
import { TestUser, TestHandler } from '../typings';

type UseCollectionProps<T> = {
  data: T[];
  options?: UseCollectionOptions<T, ItemMeta>;
  handler?: TestHandler;
};

const toData = (items?: (Item<TestUser, ItemMeta> | undefined)[]) => {
  if (items) {
    return items.map((item) => item?.data);
  }
  return undefined;
};

const UseCollectionWidget: FC<UseCollectionProps<TestUser>> = ({ data, options, handler }) => {
  const collection = useCollection(data, options);
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
      <div data-testid="result">{JSON.stringify(toData(collection.items))}</div>
      {handler && <button data-testid={handler.name} onClick={execute}></button>}
    </>
  );
};

export default UseCollectionWidget;

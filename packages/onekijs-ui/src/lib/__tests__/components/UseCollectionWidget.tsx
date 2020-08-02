import React, { FC } from 'react';
import { UseCollectionOptions } from '../../typings';
import useCollection from '../../useCollection';
import { TestUser } from '../typings';

type UseCollectionProps<T> = {
  data: T[];
  options?: UseCollectionOptions;
};

const UseCollectionWidget: FC<UseCollectionProps<TestUser>> = ({ data, options }) => {
  const collection = useCollection(data, options);
  
  return (
    <div data-testid="result">{JSON.stringify(collection.data)}</div>
  )
};

export default UseCollectionWidget;

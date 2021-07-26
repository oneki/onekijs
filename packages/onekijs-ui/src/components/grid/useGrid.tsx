import { ItemMeta, useCollection } from '@oneki/collection';
import GridService from './GridService';
import React, { useMemo } from 'react';
import { GridController, GridState, UseGridProps } from './typings';
import { useObjectProxy, useService } from '@oneki/core';

const useGrid = <T, M>({ columns, items }: UseGridProps<T, M>) => {
  const collection = useCollection(items);
  const [, service] = useService<GridState<T, M>, GridService<T, M>>(GridService, {
    columns,
  } as GridState<T, M>);
  service.onCollectionChange(collection);

  const Grid: React.FC = () => {
    return <></>;
  };

  const serviceProxy = useObjectProxy(service, {
    mutables: ['columns', 'className'],
    pick: ['initCell'],
  });

  const controller = useMemo(() => {
    return Object.assign({}, collection, serviceProxy);
  }, [collection, serviceProxy]) as GridController<T, M>;

  return controller;
};

export default useGrid;

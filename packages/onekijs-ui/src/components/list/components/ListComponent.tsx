import { useCollection } from '@oneki/collection';
import React, { FC } from 'react';
import useListView from '../hooks/useListView';
import { ListProps } from '../typings';

const ListComponent: FC<ListProps> = ({ items, ...listProps }) => {
  const collection = useCollection(items);
  const { view } = useListView({ collection, ...listProps });
  return <>{view}</>;
};

export default ListComponent;

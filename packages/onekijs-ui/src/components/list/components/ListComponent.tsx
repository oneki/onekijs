import { omit, useCollection } from 'onekijs-core';
import React, { FC } from 'react';
import { ListProps, StandardListProps, ListInternalProps } from '../typings';
import StandardListComponent from './StandardListComponent';
import VirtualistComponent from './VirtualListComponent';

const ListComponent: FC<ListProps> = (props) => {
  const { items, ...listInternalProps } = props;
  if (Array.isArray(items)) {
    return <ListDataComponent {...listInternalProps} items={items} />;
  } else {
    return <ListInternalComponent {...listInternalProps} collection={items} />;
  }
};

const ListDataComponent: FC<Omit<ListProps, 'items'> & { items: any[] }> = (props) => {
  const { items, ...listInternalProps } = props;
  const collection = useCollection(items);
  return <ListInternalComponent {...listInternalProps} collection={collection} />;
};

const ListInternalComponent: FC<ListInternalProps> = (props) => {
  if (props.height) {
    return <VirtualistComponent {...props} />;
  } else {
    const standardProps: StandardListProps = omit(props, ['itemHeight', 'height', 'preload']);
    return <StandardListComponent {...standardProps} />;
  }
};

export default ListComponent;

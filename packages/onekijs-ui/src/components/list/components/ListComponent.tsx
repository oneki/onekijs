import { isCollection } from 'onekijs-framework';
import React from 'react';
import { ListItem, ListProps } from '../typings';
import ArrayListComponent from './ArrayListComponent';
import CollectionListComponent from './CollectionListComponent';

const ListComponent = <T = any, I extends ListItem<T> = ListItem<T>>(props: ListProps<T, I>) => {
  if (isCollection(props.controller)) {
    return <CollectionListComponent {...props} controller={props.controller} />;
  } else {
    return <ArrayListComponent {...props} dataSource={props.dataSource || []} />;
  }
};

ListComponent.displayName = 'ListComponent';

export default React.memo(ListComponent) as typeof ListComponent;

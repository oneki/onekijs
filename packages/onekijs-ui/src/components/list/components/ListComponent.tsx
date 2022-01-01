import { isCollection } from 'onekijs-framework';
import React from 'react';
import { ListProps } from '../typings';
import ArrayListComponent from './ArrayListComponent';
import CollectionListComponent from './CollectionListComponent';

const ListComponent: React.FC<ListProps> = React.memo((props) => {
  if (isCollection(props.controller)) {
    return <CollectionListComponent {...props} controller={props.controller} />;
  } else {
    return <ArrayListComponent {...props} dataSource={props.dataSource || []} />;
  }
});

ListComponent.displayName = 'ListComponent';

export default ListComponent;

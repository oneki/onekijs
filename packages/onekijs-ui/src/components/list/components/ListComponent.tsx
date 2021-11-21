import { isCollection } from 'onekijs-framework';
import React from 'react';
import { ListProps } from '../typings';
import ArrayListComponent from './ArrayListComponent';
import CollectionListComponent from './CollectionListComponent';

const ListComponent: React.FC<ListProps> = React.memo((props) => {
  const dataSource = props.dataSource;
  if (isCollection(dataSource)) {
    return <CollectionListComponent {...props} dataSource={dataSource} />;
  } else {
    return <ArrayListComponent {...props} dataSource={dataSource} />;
  }
});

ListComponent.displayName = 'ListComponent';

export default ListComponent;

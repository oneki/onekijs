import React, { FC } from 'react';
import { ListItemProps } from '../typings';

const ListItemComponent: FC<ListItemProps> = React.memo(({ item, text, loading }) => {
  return <div className="o-list-item">{item === undefined && loading ? 'loading' : text}</div>;
});

ListItemComponent.displayName = 'ListItemComponent';

export default ListItemComponent;

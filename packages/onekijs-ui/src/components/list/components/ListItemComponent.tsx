import React, { FC } from 'react';
import { ListItemProps } from '../typings';

const ListItemComponent: FC<ListItemProps> = React.memo(({ text, loading }) => {
  return <div className="o-list-item">{loading ? 'loading' : text}</div>;
});

ListItemComponent.displayName = 'ListItemComponent';

export default ListItemComponent;

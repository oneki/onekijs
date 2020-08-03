import React, { FC } from 'react';
import { ListItemProps } from '../typings';

const ListItemComponent: FC<ListItemProps> = React.memo(({ index, item, adapter }) => {
  console.log('render', index);
  const { id, text } = adapter(item);
  return (
    <div key={`item-${id}`} className="o-list-item">
      {text}
    </div>
  );
});

ListItemComponent.displayName = 'ListItemComponent';

export default ListItemComponent;

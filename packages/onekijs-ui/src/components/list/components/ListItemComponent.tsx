import React, { FC } from 'react';
import { ListItemProps } from '../typings';
import { LoadingStatus } from '../../../lib/typings';

const ListItemComponent: FC<ListItemProps> = React.memo(({ item }) => {
  return (
    <div className="o-list-item">
      {item.data === undefined && item.meta?.loadingStatus === LoadingStatus.Loading ? 'loading' : item.text}
    </div>
  );
});

ListItemComponent.displayName = 'ListItemComponent';

export default ListItemComponent;
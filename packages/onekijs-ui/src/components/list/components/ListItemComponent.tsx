import React, { FC } from 'react';
import { ListItemProps } from '../typings';
import { ItemMeta, LoadingStatus } from '@oneki/collection';

const ListItemComponent: FC<ListItemProps<any, ItemMeta>> = React.memo(({ item }) => {
  return (
    <div className="o-list-item">
      {item.data === undefined && item.meta?.loadingStatus === LoadingStatus.Loading ? 'loading' : item.text}
    </div>
  );
});

ListItemComponent.displayName = 'ListItemComponent';

export default ListItemComponent;

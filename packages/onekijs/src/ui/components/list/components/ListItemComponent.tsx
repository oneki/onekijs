import React, { FC } from 'react';
import { ItemMeta, LoadingStatus } from '../../../../collection/typings';
import { ListItemProps } from '../typings';

const ListItemComponent: FC<ListItemProps<any, ItemMeta>> = React.memo(({ item }) => {
  return (
    <div className="o-list-item">
      {item.data === undefined && item.meta?.loadingStatus === LoadingStatus.Loading ? 'loading' : item.text}
    </div>
  );
});

ListItemComponent.displayName = 'ListItemComponent';

export default ListItemComponent;
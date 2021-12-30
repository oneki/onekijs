import { Item, LoadingStatus } from 'onekijs-framework';
import React, { FC } from 'react';
import { ListItemProps } from '../typings';

const ListItemComponent: FC<ListItemProps<any, Item<any>>> = React.memo(({ item }) => {
  return (
    <div className="o-list-item">
      {item?.data === undefined && item?.loadingStatus === LoadingStatus.Loading ? 'loading' : item?.text || ''}
    </div>
  );
});

ListItemComponent.displayName = 'ListItemComponent';

export default ListItemComponent;

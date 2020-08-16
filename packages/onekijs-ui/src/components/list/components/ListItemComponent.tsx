import React, { FC } from 'react';
import { ListItemProps } from '../typings';
import { LoadingStatus } from '../../../lib/typings';

const ListItemComponent: FC<ListItemProps> = React.memo(({ data, text, meta }) => {
  return (
    <div className="o-list-item">
      {data === undefined && meta?.loadingStatus === LoadingStatus.Loading ? 'loading' : text}
    </div>
  );
});

ListItemComponent.displayName = 'ListItemComponent';

export default ListItemComponent;

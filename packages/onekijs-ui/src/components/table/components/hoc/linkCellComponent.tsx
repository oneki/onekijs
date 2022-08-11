import { get, Link } from 'onekijs-framework';
import React, { FC } from 'react';
import { TableBodyCellProps } from '../../typings';

const linkCellComponent = (href: string | ((item: any) => string)): FC<TableBodyCellProps> => {
  const LinkCellComponent = (props: TableBodyCellProps) => {
    if (typeof href === 'function') {
      href = href(props.item);
    }
    return <Link href={href}>{get(props.item, `data.${props.column.id}`)}</Link>;
  };
  return LinkCellComponent;
};

export default linkCellComponent;

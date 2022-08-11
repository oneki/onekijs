import React, { FC } from 'react';
import { addClassname } from '../../../../utils/style';
import TogglerIcon from '../../../icon/TogglerIcon';
import useTableService from '../../hooks/useTableService';
import { TableBodyCellProps } from '../../typings';

const ExpandedCellComponent: FC<TableBodyCellProps> = ({ item, className }) => {
  const service = useTableService();
  return (
    <div className={addClassname('o-table-cell-expander-content', className)} onClick={() => service.toggle(item)}>
      <TogglerIcon open={item.expanded} model="plus" color="primary" />
    </div>
  );
};

export default ExpandedCellComponent;

import React, { FC } from 'react';
import { addClassname } from '../../../utils/style';
import { StandardListProps } from '../typings';

const StandardListComponent: FC<StandardListProps> = ({ className }) => {
  return <div className={addClassname('o-list', className)}></div>;
};

export default StandardListComponent;

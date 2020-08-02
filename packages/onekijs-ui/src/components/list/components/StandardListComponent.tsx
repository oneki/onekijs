import React from 'react';
import { FC } from 'react';
import { StandardListProps } from '../typings';
import { addClassname } from '../../../utils/style';

const StandardListComponent: FC<StandardListProps> = ({ className }) => {
  return <div className={addClassname('o-list', className)}></div>
}

export default StandardListComponent;

import { FCC } from 'onekijs-framework';
import React from 'react';
import { addClassname } from '../../../utils/style';
import { TagProps } from '../typings';

const TagComponent: FCC<TagProps> = ({ className, children, onClick }) => {
  return (
    <div className={addClassname('o-tag', className)} onClick={onClick}>
      {children}
    </div>
  );
};

export default TagComponent;

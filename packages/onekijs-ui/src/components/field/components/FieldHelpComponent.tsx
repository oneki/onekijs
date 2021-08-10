import Tooltip from '../../tooltip';
import React from 'react';
import { addClassname } from '../../../utils/style';
import { FieldHelpProps } from '../typings';
import { IoMdHelpCircle } from 'react-icons/io';

const FieldHelpComponent: React.FC<FieldHelpProps> = React.memo(({ className, content, visible = true }) => {
  const classNames = addClassname('o-helper-icon', className);
  return (
    <div className={classNames}>
      <Tooltip content={content} placement="top">
        <IoMdHelpCircle style={{ visibility: visible ? 'visible' : 'hidden' }} />
      </Tooltip>
    </div>
  );
});

FieldHelpComponent.displayName = 'FieldHelpComponent';

export default FieldHelpComponent;

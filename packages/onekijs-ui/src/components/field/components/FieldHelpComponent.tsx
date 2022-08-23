import React from 'react';
import { IoMdHelpCircle } from 'react-icons/io';
import { addClassname } from '../../../utils/style';
import Tooltip from '../../tooltip';
import { FieldHelpProps } from '../typings';

const FieldHelpComponent: React.FC<FieldHelpProps> = React.memo(
  ({ className, content, visible = true, size = 'medium' }) => {
    const classNames = addClassname(`o-helper-icon o-helper-icon-${size}`, className);
    return (
      <div className={classNames}>
        <Tooltip content={content} placement="top">
          <IoMdHelpCircle style={{ visibility: visible ? 'visible' : 'hidden' }} />
        </Tooltip>
      </div>
    );
  },
);

FieldHelpComponent.displayName = 'FieldHelpComponent';

export default FieldHelpComponent;

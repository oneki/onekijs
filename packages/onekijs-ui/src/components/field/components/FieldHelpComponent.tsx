import React from 'react';
import { addClassname } from '../../../utils/style';
import Tooltip from '../../tooltip';
import { FieldHelpProps } from '../typings';
import HelpIcon from '../../icon/HelpIcon';

const FieldHelpComponent: React.FC<FieldHelpProps> = React.memo(
  ({ className, content, visible = true, size = 'medium' }) => {
    const classNames = addClassname(`o-helper-icon o-helper-icon-${size}`, className);
    return (
      <div className={classNames}>
        <Tooltip content={content} placement="top">
          <HelpIcon style={{ visibility: visible ? 'visible' : 'hidden' }} />
        </Tooltip>
      </div>
    );
  },
);

FieldHelpComponent.displayName = 'FieldHelpComponent';

export default FieldHelpComponent;

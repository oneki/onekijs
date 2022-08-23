import React from 'react';
import { addClassname } from '../../../utils/style';
import { FieldDescriptionProps } from '../typings';

const FieldDescriptionComponent: React.FC<FieldDescriptionProps> = React.memo(
  ({ className, content, size = 'medium' }) => {
    const classNames = addClassname(`o-field-description o-field-description-${size}`, className);
    return <div className={classNames}>{content}</div>;
  },
);

FieldDescriptionComponent.displayName = 'FieldDescriptionComponent';

export default FieldDescriptionComponent;

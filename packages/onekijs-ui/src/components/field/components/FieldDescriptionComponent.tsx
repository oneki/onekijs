import React from 'react';
import { addClassname } from '../../../utils/style';
import { FieldDescriptionProps } from "../typings";

const FieldDescriptionComponent: React.FC<FieldDescriptionProps> = React.memo(({
  className,
  content
}) => {
  const classNames = addClassname('o-field-description', className);
  return <div className={classNames}>{content}</div>
});

export default FieldDescriptionComponent;
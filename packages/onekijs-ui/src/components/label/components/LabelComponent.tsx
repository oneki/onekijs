import React from 'react';
import { IoIosHelpCircleOutline } from 'react-icons/io';
import { addClassname } from '../../../utils/style';
import { LabelProps } from '../typings';

const LabelComponent: React.FC<LabelProps> = React.memo(({
  className,
  htmlFor,
  help,
  layout = 'vertical',
  required,
  text,
}) => {
  const classNames = addClassname(`o-label o-label-${layout}`, className);

  if (layout === 'vertical') {
    return (
      <div className={classNames}>
        <label htmlFor={`${htmlFor}`} className="o-label-text">{text}</label>
        {required && <span className="o-marker-required">*</span>}
        {help && <IoIosHelpCircleOutline />}
      </div>
    )
  } else if (layout === 'horizontal') {
    return (
      <div className={classNames}>
        <label htmlFor={`${htmlFor}`} className="o-label-text">{text}</label>
        <span className={`o-marker-${required ? 'required':'optional'}`}>*</span>
      </div>
    )
  }
  return null;
});

export default LabelComponent;
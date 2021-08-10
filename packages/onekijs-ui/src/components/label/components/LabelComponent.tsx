import React, { LabelHTMLAttributes } from 'react';
import { addClassname } from '../../../utils/style';
import FieldHelp from '../../field/FieldHelp';
import { LabelProps } from '../typings';

const LabelComponent: React.FC<LabelProps> = React.memo(
  ({ className, htmlFor, help, HelpComponent = FieldHelp, layout = 'vertical', required, text, size }) => {
    const classNames = addClassname(`o-label o-label-${layout}${size ? ` o-label-${size}` : ''}`, className);
    const labelProps: LabelHTMLAttributes<HTMLLabelElement> = {
      className: 'o-label-text',
    };
    if (htmlFor) {
      labelProps.htmlFor = `${htmlFor}`;
    }

    if (layout === 'vertical') {
      return (
        <div className={classNames}>
          <label {...labelProps}>{text}</label>
          {required && <span className="o-marker-required">*</span>}
          <HelpComponent content={help} visible={help ? true : false} />
        </div>
      );
    } else if (layout === 'horizontal') {
      return (
        <div className={classNames}>
          <label {...labelProps}>{text}</label>
          <span className={`o-marker-${required ? 'required' : 'optional'}`}>*</span>
        </div>
      );
    }
    return null;
  },
);

LabelComponent.displayName = 'LabelComponent';

export default LabelComponent;

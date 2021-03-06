import { FormLayout, useFormContext, useSetting } from 'onekijs-core';
import React from 'react';
import { GridSize } from '../../../styles/typings';
import { gridSize } from '../../../utils/size';
import { addClassname } from '../../../utils/style';
import Label from '../../label';
import FieldDescription from '../FieldDescription';
import FieldHelp from '../FieldHelp';
import { FieldLayoutProps } from '../typings';


const FieldLayoutComponent: React.FC<FieldLayoutProps> = React.memo(({
  className,
  description,
  help,
  HelpComponent = FieldHelp,
  id,
  label,
  LabelComponent = Label,
  DescriptionComponent = FieldDescription,
  labelWidth,
  layout,
  required,
  children,
  size,
}) => {
  const settingLayout = useSetting('form.layout');
  const settingWidth = useSetting('form.labelWidth');
  const { layout: contextLayout, labelWidth: contextWidth } = useFormContext();
  let fieldLayout: FormLayout = layout || contextLayout || settingLayout || 'vertical';
  const fieldLabelWidth: GridSize = labelWidth || contextWidth || settingWidth || 5;
  const classNames = addClassname(`o-form-field o-form-field-${fieldLayout}`, className);

  if (fieldLayout === 'vertical') {
    return (
      <div className={classNames}>
        {label && <LabelComponent
          description={description}
          htmlFor={id}
          text={label}
          layout={fieldLayout}
          required={required}
          size={size}
          help={help}
        />}
        {children}
        {description && <DescriptionComponent content={description} />}
      </div>
    )
  } else if (layout === 'horizontal') {
    return (
      <div className={classNames}>
        {label && <LabelComponent
          description={description}
          htmlFor={id}
          help={help}
          text={label}
          width={fieldLabelWidth}
          layout={fieldLayout}
          required={required}
          size={size}
        />}
        <div style={{ display: 'flex', flexDirection: 'column', width: `${gridSize((12 - fieldLabelWidth) as GridSize)}` }}>
          <div style={{ display: 'flex' }}>
            {children}
            {<HelpComponent content={help} visible={help ? true : false} />}
          </div>
          {description && <DescriptionComponent content={description} />}
        </div>
      </div>
    )
  }
  return null;
});

export default FieldLayoutComponent;
import { FormLayout, useFormContext, useSetting } from 'onekijs-core';
import React from 'react';
import { DescriptionProps, FieldLayoutProps } from '../typings';
import Label from '../../label';
import { addClassname } from '../../../utils/style';
import { gridSize } from '../../../utils/size';
import { GridSize } from '../../../styles/typings';

const Description: React.FC<DescriptionProps> = React.memo(({
  className,
  text
}) => {
  const classNames = addClassname('o-field-description', className);
  return <div className={classNames}>{text}</div>
});

const FieldLayoutComponent: React.FC<FieldLayoutProps> = React.memo(({
  className,
  description,
  help,
  id,
  label,
  LabelComponent = Label,
  DescriptionComponent = Description,
  labelWidth,
  layout,
  required,
  children,
}) => {
  const settingLayout = useSetting('form.layout');
  const settingWidth = useSetting('form.labelWidth');
  const { layout: contextLayout, labelWidth: contextWidth } = useFormContext();
  let fieldLayout: FormLayout = layout || contextLayout || settingLayout || 'vertical';
  const fieldLabelWidth: GridSize = labelWidth || contextWidth || settingWidth || 2;
  const classNames = addClassname(`o-form-field`, className);

  if (fieldLayout === 'vertical') {
    return (
      <div className={classNames}>
        {label && <LabelComponent
          description={description}
          htmlFor={id}
          help={help}
          text={label}
          layout={fieldLayout}
          required={required}
        />}
        {children}
        {description && <DescriptionComponent text={description} />}
      </div>
    )
  } else if (layout === 'horizontal') {
    return (
      <div className={classNames}>
        <div>
          {label && <LabelComponent
            description={description}
            htmlFor={id}
            help={help}
            text={label}
            width={fieldLabelWidth}
            layout={fieldLayout}
            required={required}
          />}
          <div style={{ width: `${gridSize((12 - fieldLabelWidth) as GridSize)}` }}>
            {children}
          </div>
        </div>
        <div>
          <div style={{ width: `${gridSize(fieldLabelWidth)}` }}></div>
          <div style={{ width: `${gridSize((12 - fieldLabelWidth) as GridSize)}` }}>
            {description && <DescriptionComponent text={description} />}
          </div>
        </div>
      </div>
    )
  }
  return null;
});

export default FieldLayoutComponent;
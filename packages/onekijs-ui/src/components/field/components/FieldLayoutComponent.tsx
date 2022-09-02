import { FCC, FormLayout, useForm, useTrySetting } from 'onekijs-framework';
import React from 'react';
import { addClassname } from '../../../utils/style';
import Col from '../../grid/Col';
import Row from '../../grid/Row';
import { GridSize } from '../../grid/typings';
import Label from '../../label';
import FieldDescription from '../FieldDescription';
import FieldHelp from '../FieldHelp';
import { FieldLayoutProps } from '../typings';

const FieldLayoutComponent: FCC<FieldLayoutProps> = React.memo(
  ({
    className,
    description,
    help,
    HelpComponent = FieldHelp,
    id,
    label,
    LabelComponent = Label,
    DescriptionComponent = FieldDescription,
    labelWidth,
    xsLabelWidth,
    smLabelWidth,
    mdLabelWidth,
    lgLabelWidth,
    xlLabelWidth,
    layout,
    required,
    children,
    size,
    validation,
    visible,
  }) => {
    const form = useForm();
    const settingLayout = useTrySetting('form.layout');
    const settingWidth = useTrySetting('form.labelWidth');
    const settingXsLabelWidth = useTrySetting('form.xsLabelWidth');
    const settingSmLabelWidth = useTrySetting('form.smLabelWidth');
    const settingMdLabelWidth = useTrySetting('form.mdLabelWidth');
    const settingLgLabelWidth = useTrySetting('form.lgLabelWidth');
    const settingXlLabelWidth = useTrySetting('form.xlLabelWidth');
    const settingFieldSize = useTrySetting('form.fieldSize');

    if (visible === false) return null;

    const fieldLayout: FormLayout = layout || form.config.layout || settingLayout || 'vertical';
    const fieldLabelWidth: GridSize = labelWidth || form.config.labelWidth || settingWidth || 3;
    const xsFieldLabelWidth: GridSize | undefined =
      xsLabelWidth || form.config.xsLabelWidth || settingXsLabelWidth || undefined;
    const smFieldLabelWidth: GridSize | undefined =
      smLabelWidth || form.config.smLabelWidth || settingSmLabelWidth || undefined;
    const mdFieldLabelWidth: GridSize | undefined =
      mdLabelWidth || form.config.mdLabelWidth || settingMdLabelWidth || undefined;
    const lgFieldLabelWidth: GridSize | undefined =
      lgLabelWidth || form.config.lgLabelWidth || settingLgLabelWidth || undefined;
    const xlFieldLabelWidth: GridSize | undefined =
      xlLabelWidth || form.config.xlLabelWidth || settingXlLabelWidth || undefined;
    const classNames = addClassname(`o-form-field o-form-field-${fieldLayout}`, className);
    const fieldSize = size || form.config.fieldSize || settingFieldSize;
    let status: string | undefined = undefined;
    let message: string | undefined = undefined;
    if (validation && validation.message) {
      status = validation.status.toLowerCase();
      message = validation.message;
    }

    if (fieldLayout === 'vertical') {
      return (
        <Row className={classNames} marginBottom="15px">
          {label && (
            <Col size={12} className="o-form-field-label">
              <LabelComponent
                description={description}
                htmlFor={id}
                text={label}
                layout={fieldLayout}
                required={required}
                size={fieldSize}
                help={help}
              />
            </Col>
          )}
          <Col size={12} className="o-form-field-content">
            {children}
          </Col>
          {(description || message) && (
            <Col size={12} className="o-form-field-description">
              <DescriptionComponent
                content={message ? message : description || ''}
                className={status !== undefined ? `o-field-description-${status}` : undefined}
              />
            </Col>
          )}
        </Row>
      );
    } else if (fieldLayout === 'horizontal') {
      return (
        <Row className={classNames} marginBottom="15px">
          <Col
            size={fieldLabelWidth}
            xs={xsFieldLabelWidth}
            sm={smFieldLabelWidth}
            md={mdFieldLabelWidth}
            lg={lgFieldLabelWidth}
            xl={xlFieldLabelWidth}
            className="o-form-field-label"
          >
            {label && (
              <LabelComponent
                description={description}
                htmlFor={id}
                help={help}
                text={label}
                layout={fieldLayout}
                required={required}
                size={fieldSize}
              />
            )}
          </Col>
          <Col
            size={(12 - fieldLabelWidth) as GridSize}
            xs={xsFieldLabelWidth !== undefined ? ((12 - xsFieldLabelWidth) as GridSize) : undefined}
            sm={smFieldLabelWidth !== undefined ? ((12 - smFieldLabelWidth) as GridSize) : undefined}
            md={mdFieldLabelWidth !== undefined ? ((12 - mdFieldLabelWidth) as GridSize) : undefined}
            lg={lgFieldLabelWidth !== undefined ? ((12 - lgFieldLabelWidth) as GridSize) : undefined}
            xl={xlFieldLabelWidth !== undefined ? ((12 - xlFieldLabelWidth) as GridSize) : undefined}
            className="o-form-field-content"
          >
            {children}
            {<HelpComponent content={help} visible={help ? true : false} />}
          </Col>
          <Col
            size={fieldLabelWidth}
            xs={xsFieldLabelWidth}
            sm={smFieldLabelWidth}
            md={mdFieldLabelWidth}
            lg={lgFieldLabelWidth}
            xl={xlFieldLabelWidth}
          />
          <Col
            size={(12 - fieldLabelWidth) as GridSize}
            xs={xsFieldLabelWidth !== undefined ? ((12 - xsFieldLabelWidth) as GridSize) : undefined}
            sm={smFieldLabelWidth !== undefined ? ((12 - smFieldLabelWidth) as GridSize) : undefined}
            md={mdFieldLabelWidth !== undefined ? ((12 - mdFieldLabelWidth) as GridSize) : undefined}
            lg={lgFieldLabelWidth !== undefined ? ((12 - lgFieldLabelWidth) as GridSize) : undefined}
            xl={xlFieldLabelWidth !== undefined ? ((12 - xlFieldLabelWidth) as GridSize) : undefined}
            className="o-form-field-description"
          >
            <DescriptionComponent
              content={message ? message : description || ''}
              className={status !== undefined ? `o-field-description-${status}` : undefined}
            />
          </Col>
        </Row>
      );
    }
    return null;
  },
);

FieldLayoutComponent.displayName = 'FieldLayoutComponent';

export default FieldLayoutComponent;

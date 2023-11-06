import React from 'react';
import { addClassname } from '../../../utils/style';
import Col from '../../grid/Col';
import Row from '../../grid/Row';
import { FieldDisplayerProps } from '../typings';

const FieldDisplayerComponent: React.FC<FieldDisplayerProps> = ({ className, label, value, help, format }) => {
  if (format === 'form_summary') {
    return (
      <Row marginBottom="md" className={addClassname('o-field-displayer-form-summary', className)}>
        <Col size={12} md={4} lg={3} xl={2} className="o-field-displayer-form-summary-label-container">
          <div className="o-field-displayer-form-summary-label">
            <span>{label}</span>
            {/* {help && <FieldHelp content={help} visible={help ? true : false} layout="horizontal" />} */}
          </div>
        </Col>
        <Col size={12} md={8} lg={9} xl={10} className="o-field-displayer-form-summary-value">
          {value}
        </Col>
      </Row>
    );
  }

  if (format === 'form_summary_table') {
    return (
      <div className={addClassname('o-field-displayer-form-summary-table', className)}>
        {label && <span className="o-field-displayer-form-summary-table-label">{label}:</span>}
        <span className="o-field-displayer-form-summary-table-value">{value}</span>
      </div>
    );
  }

  return null;
};

export default FieldDisplayerComponent;

import React from 'react';
import { FormTableValueDisplayerProps } from '../typings';
import FormTableItemDisplayer from './FormTableItemDisplayer';
import styled from 'styled-components';
import { addClassname } from '../../../utils/style';
import { borderBottomColor, borderBottomStyle, borderBottomWidth } from '../../../styles/border';
import { paddingBottom, paddingTop, paddingY } from '../../../styles/spacing';

const FormTableValueDisplayer: React.FC<FormTableValueDisplayerProps> = ({ name, columns, value, format, className }) => {
  if (!Array.isArray(value)) return null;
  return (
    <div className={addClassname('o-form-table-displayer-value', className)}>
      {value.map((v: any, index: number) => (
        <FormTableItemDisplayer
          key={`item-${index}`}
          value={v}
          columns={columns}
          first={index === 0}
          last={index === value.length - 1}
          format={format === 'csv' ? 'csv' : 'form_summary_table'}
          name={`${name}.${index}`}
          index={index}
        />
      ))}
    </div>
  );
};

export default styled(FormTableValueDisplayer)`
  .o-form-table-item-displayer {
    ${borderBottomColor('primary')}
    ${borderBottomStyle('solid')}
    ${borderBottomWidth('1px')}
    ${paddingY('sm')}
    &.o-form-table-item-displayer-last{
      ${paddingBottom(0)}
      ${borderBottomWidth(0)}
    }
    &.o-form-table-item-displayer-first{
      ${paddingTop(0)}
    }
  }
`;

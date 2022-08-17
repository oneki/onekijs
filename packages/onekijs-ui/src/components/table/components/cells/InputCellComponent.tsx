import { extractValidators, useField, useValidation } from 'onekijs-framework';
import React from 'react';
import FieldDescription from '../../../field/FieldDescription';
import Input from '../../../input';
import useFormTableContext from '../../hooks/useFormTableContext';
import { TableBodyCellProps, UseInputColumnOptions } from '../../typings';

const InputCellComponent = (options: UseInputColumnOptions<any, any>): React.FC<TableBodyCellProps<any, any>> => {
  const InputCellComponent: React.FC<TableBodyCellProps<any, any>> = ({ column, rowIndex }) => {
    const { tableName } = useFormTableContext();
    const [validators] = extractValidators(options);
    const field = useField(`${tableName}.${rowIndex}.${column.id}`, validators);
    const validation = useValidation(`${tableName}.${rowIndex}.${column.id}`);
    const status = validation?.status;
    const message = validation?.message;
    const size = options.size || 'small';

    return (
      <>
        <Input {...options} size={size} {...field} className="o-table-input" status={validation.status} />
        {message && <FieldDescription content={message} className={`o-field-description-${status.toLowerCase()}`} />}
      </>
    );
  };
  InputCellComponent.displayName = 'InputCellComponent';
  return InputCellComponent;
};

export default InputCellComponent;

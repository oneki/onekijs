import { extractValidators, useField, useValidation } from 'onekijs-framework';
import React from 'react';
import Checkbox from '../../../checkbox';
import FieldDescription from '../../../field/FieldDescription';
import useFormTableContext from '../../hooks/useFormTableContext';
import { TableBodyCellProps, UseCheckboxColumnOptions } from '../../typings';

const CheckboxCellComponent = (options: UseCheckboxColumnOptions<any, any>): React.FC<TableBodyCellProps<any, any>> => {
  const CheckboxCellComponent: React.FC<TableBodyCellProps<any, any>> = ({ column, rowIndex }) => {
    const { tableName } = useFormTableContext();
    const [validators] = extractValidators(options);
    const field = useField(`${tableName}.${rowIndex}.${column.id}`, validators, {
      defaultValue: options.defaultValue ? options.defaultValue : false,
    });
    const validation = useValidation(`${tableName}.${rowIndex}.${column.id}`);
    const status = validation?.status;
    const message = validation?.message;

    return (
      <>
        <Checkbox {...options} {...field} className="o-table-checkbox" status={validation.status} />
        {message && <FieldDescription content={message} className={`o-field-description-${status.toLowerCase()}`} />}
      </>
    );
  };
  CheckboxCellComponent.displayName = 'CheckboxCellComponent';
  return CheckboxCellComponent;
};

export default CheckboxCellComponent;
